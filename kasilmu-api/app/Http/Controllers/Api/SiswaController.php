<?php

namespace App\Http\Controllers\Api;

use App\Models\Kela;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class SiswaController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Siswa::with('sekolah');

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
        $last = Siswa::where('nis', 'like', $year . '%')->orderByDesc('nis')->value('nis');
        $next = $last ? ((int) substr($last, 4)) + 1 : 1;

        return $year . str_pad((string) $next, 4, '0', STR_PAD_LEFT);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'         => 'required|string|max:255',
            'email'        => 'nullable|email|max:255',
            'no_telp'      => 'nullable|string|max:20',
            'tgl_lahir'    => 'required|date',
            'alamat'       => 'nullable|string',
            'sekolah_id'   => 'nullable|exists:sekolahs,id',
            'kelas_asal'   => 'nullable|string|max:50',
            'tingkat'      => 'required|integer|between:1,12',
            'jenjang'      => 'required|in:SD,SMP,SMA',
            'nama_ortu'    => 'nullable|string|max:255',
            'no_telp_ortu' => 'nullable|string|max:20',
            'foto'         => 'nullable|string|max:255',
            'status'       => 'nullable|in:aktif,nonaktif,lulus',
            'kelas_id'     => 'required|exists:kelas,id',
        ]);

        $kelasId = $validated['kelas_id'];
        unset($validated['kelas_id']);

        try {
            $siswa = DB::transaction(function () use ($validated, $kelasId) {
                $validated['nis'] = $this->generateNis();
                $siswa = Siswa::create($validated);

                $kela = Kela::findOrFail($kelasId);

                if ($kela->isFull()) {
                    throw new RuntimeException("Kelas sudah penuh (kapasitas {$kela->kapasitas} orang)");
                }

                $kela->siswa()->attach($siswa->id, [
                    'tgl_masuk' => now()->toDateString(),
                    'status'    => 'aktif',
                ]);

                return $siswa;
            });
        } catch (RuntimeException $e) {
            return $this->error($e->getMessage(), 422);
        }

        return $this->success($siswa, 'Siswa berhasil ditambahkan', 201);
    }

    public function show(Siswa $siswa)
    {
        $siswa->load(['kelas', 'tagihans', 'nilais', 'sekolah']);

        return $this->success($siswa);
    }

    public function update(Request $request, Siswa $siswa)
    {
        $validated = $request->validate([
            'nama'         => 'required|string|max:255',
            'email'        => 'nullable|email|max:255',
            'no_telp'      => 'nullable|string|max:20',
            'tgl_lahir'    => 'required|date',
            'alamat'       => 'nullable|string',
            'sekolah_id'   => 'nullable|exists:sekolahs,id',
            'kelas_asal'   => 'nullable|string|max:50',
            'tingkat'      => 'required|integer|between:1,12',
            'jenjang'      => 'required|in:SD,SMP,SMA',
            'nama_ortu'    => 'nullable|string|max:255',
            'no_telp_ortu' => 'nullable|string|max:20',
            'foto'         => 'nullable|string|max:255',
            'status'       => 'nullable|in:aktif,nonaktif,lulus',
        ]);

        $siswa->update($validated);

        return $this->success($siswa, 'Siswa berhasil diperbarui');
    }

    public function destroy(Siswa $siswa)
    {
        $siswa->delete();

        return $this->success(null, 'Siswa berhasil dihapus');
    }
}
