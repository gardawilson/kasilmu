<?php

namespace App\Http\Controllers\Api;

use App\Models\HargaPaket;
use App\Models\Paket;
use App\Models\Siswa;
use App\Models\SiswaPaket;
use App\Models\Tagihan;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class SiswaPaketController
{
    use ApiResponse, TutorScope;

    public function index(Request $request)
    {
        $query = SiswaPaket::with(['siswa:id,nama,nis', 'kelas:id,nama', 'paket:id,nama,jumlah_pertemuan']);

        $kelasIds = $this->tutorKelasIds($request);

        if ($kelasIds !== null) {
            $query->whereIn('kelas_id', $kelasIds);
        }

        if ($request->siswa_id) {
            $query->where('siswa_id', $request->siswa_id);
        }

        if ($request->kelas_id) {
            $query->where('kelas_id', $request->kelas_id);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return $this->paginated($query->latest()->paginate($request->per_page ?? 20));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswas,id',
            'kelas_id' => 'required|exists:kelas,id',
            'paket_id' => 'required|exists:pakets,id',
            'tgl_mulai' => 'required|date',
        ]);

        $paket = Paket::findOrFail($validated['paket_id']);

        $hargaPaket = HargaPaket::where('kelas_id', $validated['kelas_id'])
            ->where('paket_id', $validated['paket_id'])
            ->first();

        if (! $hargaPaket) {
            return $this->error('Harga untuk kombinasi kelas dan paket ini belum diatur', 422);
        }

        $validated['tgl_selesai'] = Carbon::parse($validated['tgl_mulai'])
            ->addMonthNoOverflow()
            ->toDateString();

        $paketPertamaDiKelas = ! SiswaPaket::where('siswa_id', $validated['siswa_id'])
            ->where('kelas_id', $validated['kelas_id'])
            ->exists();

        SiswaPaket::where('siswa_id', $validated['siswa_id'])
            ->where('kelas_id', $validated['kelas_id'])
            ->where('status', 'aktif')
            ->update(['status' => 'selesai']);

        $siswaPaket = SiswaPaket::create($validated);

        if ($paketPertamaDiKelas) {
            Siswa::findOrFail($validated['siswa_id'])->kelas()->updateExistingPivot(
                $validated['kelas_id'],
                ['tgl_masuk' => $validated['tgl_mulai']]
            );
        }

        Tagihan::create([
            'siswa_id' => $validated['siswa_id'],
            'siswa_paket_id' => $siswaPaket->id,
            'jenis' => 'spp',
            'jumlah' => $hargaPaket->harga,
            'tenggat' => $validated['tgl_mulai'],
            'status' => 'pending',
        ]);

        $siswaPaket->load(['siswa:id,nama,nis', 'kelas:id,nama', 'paket:id,nama,jumlah_pertemuan']);

        return $this->success($siswaPaket, 'Paket siswa berhasil ditambahkan', 201);
    }

    public function show(SiswaPaket $siswaPaket)
    {
        $siswaPaket->load(['siswa:id,nama,nis', 'kelas:id,nama', 'paket:id,nama,jumlah_pertemuan']);

        return $this->success($siswaPaket);
    }

    public function aktif(Siswa $siswa)
    {
        $paket = SiswaPaket::with(['paket:id,nama,jumlah_pertemuan', 'kelas:id,nama'])
            ->where('siswa_id', $siswa->id)
            ->where('status', 'aktif')
            ->first();

        if (! $paket) {
            return $this->success(null, 'Tidak ada paket aktif');
        }

        $paketBerikutnya = SiswaPaket::with(['paket:id,nama,jumlah_pertemuan', 'tagihan'])
            ->where('siswa_id', $siswa->id)
            ->where('kelas_id', $paket->kelas_id)
            ->where('status', 'terjadwal')
            ->orderBy('tgl_mulai')
            ->first();

        $paket->setRelation('paketBerikutnya', $paketBerikutnya);

        return $this->success($paket);
    }

    public function gantiPaket(Request $request, SiswaPaket $siswaPaket)
    {
        if ($siswaPaket->status !== 'aktif') {
            return $this->error('Penggantian hanya dapat dilakukan dari paket yang sedang aktif', 422);
        }

        $validated = $request->validate([
            'paket_id' => 'required|exists:pakets,id',
            'tgl_mulai' => 'nullable|date',
        ]);

        if ((int) $validated['paket_id'] === $siswaPaket->paket_id) {
            return $this->error('Pilih paket yang berbeda dari paket aktif', 422);
        }

        $hargaPaket = HargaPaket::where('kelas_id', $siswaPaket->kelas_id)
            ->where('paket_id', $validated['paket_id'])
            ->first();

        if (! $hargaPaket) {
            return $this->error('Harga untuk kombinasi kelas dan paket ini belum diatur', 422);
        }

        $tglMulai = $validated['tgl_mulai'] ?? now()->toDateString();

        if (Carbon::parse($tglMulai)->lt($siswaPaket->tgl_mulai)) {
            return $this->error('Tanggal mulai paket baru tidak boleh sebelum tanggal mulai paket yang sedang aktif', 422);
        }

        if (Carbon::parse($tglMulai)->gt(now())) {
            return $this->error('Tanggal mulai paket baru tidak boleh di masa depan', 422);
        }

        $tglSelesai = Carbon::parse($tglMulai)->addMonthNoOverflow()->toDateString();

        try {
            $paketBaru = DB::transaction(function () use ($siswaPaket, $validated, $hargaPaket, $tglMulai, $tglSelesai) {
                $terjadwal = SiswaPaket::where('siswa_id', $siswaPaket->siswa_id)
                    ->where('kelas_id', $siswaPaket->kelas_id)
                    ->where('status', 'terjadwal')
                    ->first();

                if ($terjadwal) {
                    if ($terjadwal->tagihan?->pembayarans()->exists()) {
                        throw new RuntimeException('Tidak dapat mengganti paket karena tagihan periode berikutnya sudah memiliki pembayaran');
                    }

                    $terjadwal->tagihan()->delete();
                    $terjadwal->delete();
                }

                $siswaPaket->update(['tgl_selesai' => $tglMulai, 'status' => 'selesai']);

                $paketBaru = SiswaPaket::create([
                    'siswa_id' => $siswaPaket->siswa_id,
                    'kelas_id' => $siswaPaket->kelas_id,
                    'paket_id' => $validated['paket_id'],
                    'tgl_mulai' => $tglMulai,
                    'tgl_selesai' => $tglSelesai,
                    'status' => 'aktif',
                ]);

                Tagihan::create([
                    'siswa_id' => $siswaPaket->siswa_id,
                    'siswa_paket_id' => $paketBaru->id,
                    'jenis' => 'spp',
                    'jumlah' => $hargaPaket->harga,
                    'tenggat' => $tglMulai,
                    'status' => 'pending',
                ]);

                return $paketBaru;
            });
        } catch (RuntimeException $e) {
            return $this->error($e->getMessage(), 422);
        }

        return $this->success(
            $paketBaru->load(['paket:id,nama,jumlah_pertemuan', 'kelas:id,nama', 'tagihan']),
            'Paket siswa berhasil diganti'
        );
    }

    public function update(Request $request, SiswaPaket $siswaPaket)
    {
        $validated = $request->validate([
            'paket_id' => 'nullable|exists:pakets,id',
            'tgl_mulai' => 'nullable|date',
            'status' => 'nullable|in:aktif,terjadwal,selesai',
        ]);

        if (isset($validated['tgl_mulai'])) {
            $validated['tgl_selesai'] = Carbon::parse($validated['tgl_mulai'])
                ->addMonthNoOverflow()
                ->toDateString();
        }

        $siswaPaket->update($validated);

        return $this->success($siswaPaket->load(['siswa:id,nama,nis', 'kelas:id,nama', 'paket:id,nama,jumlah_pertemuan']), 'Paket siswa berhasil diperbarui');
    }

    public function destroy(SiswaPaket $siswaPaket)
    {
        if ($siswaPaket->tagihan?->pembayarans()->exists()) {
            return $this->error('Paket tidak dapat dihapus karena tagihannya sudah memiliki pembayaran', 422);
        }

        $siswaPaket->tagihan()->delete();
        $siswaPaket->delete();

        return $this->success(null, 'Paket siswa berhasil dihapus');
    }
}
