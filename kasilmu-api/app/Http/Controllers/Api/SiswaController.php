<?php

namespace App\Http\Controllers\Api;

use App\Models\HargaPaket;
use App\Models\Kela;
use App\Models\Siswa;
use App\Models\SiswaPaket;
use App\Models\Tagihan;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use RuntimeException;

class SiswaController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Siswa::with([
            'sekolah',
            'tingkat.jenjang',
            'kelas:id,nama',
            'siswaPakets' => fn ($q) => $q->where('status', 'aktif')
                ->with(['paket:id,nama,jumlah_pertemuan', 'kelas:id,nama']),
        ]);

        if ($search = $request->search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('nis', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($status = $request->status) {
            $query->where('status', $status);
        }

        return $this->paginated($query->latest()->paginate($request->per_page ?? 10));
    }

    private function generateNis(): string
    {
        $year = now()->format('Y');
        $last = Siswa::where('nis', 'like', $year.'%')->orderByDesc('nis')->value('nis');
        $next = $last ? ((int) substr($last, 4)) + 1 : 1;

        return $year.str_pad((string) $next, 4, '0', STR_PAD_LEFT);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'no_telp' => 'nullable|string|max:20',
            'tgl_lahir' => 'required|date',
            'alamat' => 'nullable|string',
            'sekolah_id' => 'nullable|exists:sekolahs,id',
            'kelas_asal' => 'nullable|string|max:50',
            'jenjang_id' => [
                'required',
                Rule::exists('jenjangs', 'id')->where('is_active', true),
            ],
            'tingkat_id' => [
                'required',
                Rule::exists('tingkats', 'id')->where(fn ($query) => $query
                    ->where('jenjang_id', $request->integer('jenjang_id'))
                    ->where('is_active', true)),
            ],
            'nama_ortu' => 'nullable|string|max:255',
            'no_telp_ortu' => 'nullable|string|max:20',
            'foto' => 'nullable|string|max:255',
            'status' => 'nullable|in:aktif,nonaktif,lulus',
            'kelas_id' => 'required|exists:kelas,id',
            'paket_id' => 'required|exists:pakets,id',
            'tgl_mulai_paket' => 'nullable|date',
        ]);

        $kelasId = $validated['kelas_id'];
        $paketId = $validated['paket_id'];
        $tglMulaiPaket = Carbon::parse($validated['tgl_mulai_paket'] ?? now())->toDateString();
        unset($validated['kelas_id'], $validated['paket_id'], $validated['jenjang_id'], $validated['tgl_mulai_paket']);

        try {
            $siswa = DB::transaction(function () use ($validated, $kelasId, $paketId, $tglMulaiPaket) {
                $validated['nis'] = $this->generateNis();
                $siswa = Siswa::create($validated);

                $kela = Kela::findOrFail($kelasId);

                if ($kela->isFull()) {
                    throw new RuntimeException("Kelas sudah penuh (kapasitas {$kela->kapasitas} orang)");
                }

                $hargaPaket = HargaPaket::where('kelas_id', $kelasId)->where('paket_id', $paketId)->first();

                if (! $hargaPaket) {
                    throw new RuntimeException('Harga untuk kombinasi kelas dan paket ini belum diatur');
                }

                $kela->siswa()->attach($siswa->id, [
                    'tgl_masuk' => $tglMulaiPaket,
                    'status' => 'aktif',
                ]);

                $siswaPaket = SiswaPaket::create([
                    'siswa_id' => $siswa->id,
                    'kelas_id' => $kelasId,
                    'paket_id' => $paketId,
                    'tgl_mulai' => $tglMulaiPaket,
                    'tgl_selesai' => Carbon::parse($tglMulaiPaket)->addMonthNoOverflow()->toDateString(),
                    'status' => 'aktif',
                ]);

                Tagihan::create([
                    'siswa_id' => $siswa->id,
                    'siswa_paket_id' => $siswaPaket->id,
                    'jenis' => 'spp',
                    'jumlah' => $hargaPaket->harga,
                    'tenggat' => $tglMulaiPaket,
                    'status' => 'pending',
                ]);

                return $siswa;
            });
        } catch (RuntimeException $e) {
            return $this->error($e->getMessage(), 422);
        }

        return $this->success($siswa->load('tingkat.jenjang'), 'Siswa berhasil ditambahkan', 201);
    }

    public function show(Siswa $siswa)
    {
        $siswa->load(['kelas', 'tagihans', 'nilais', 'sekolah', 'tingkat.jenjang']);

        return $this->success($siswa);
    }

    public function update(Request $request, Siswa $siswa)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'no_telp' => 'nullable|string|max:20',
            'tgl_lahir' => 'required|date',
            'alamat' => 'nullable|string',
            'sekolah_id' => 'nullable|exists:sekolahs,id',
            'kelas_asal' => 'nullable|string|max:50',
            'jenjang_id' => 'required|exists:jenjangs,id',
            'tingkat_id' => [
                'required',
                Rule::exists('tingkats', 'id')->where(fn ($query) => $query
                    ->where('jenjang_id', $request->integer('jenjang_id'))),
            ],
            'nama_ortu' => 'nullable|string|max:255',
            'no_telp_ortu' => 'nullable|string|max:20',
            'foto' => 'nullable|string|max:255',
            'status' => 'nullable|in:aktif,nonaktif,lulus',
        ]);

        unset($validated['jenjang_id']);
        $siswa->update($validated);

        return $this->success($siswa->load('tingkat.jenjang'), 'Siswa berhasil diperbarui');
    }

    public function destroy(Siswa $siswa)
    {
        $siswa->delete();

        return $this->success(null, 'Siswa berhasil dihapus');
    }
}
