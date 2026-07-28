<?php

namespace App\Http\Controllers\Api;

use App\Models\HargaPaket;
use App\Models\Paket;
use App\Models\Siswa;
use App\Models\SiswaPaket;
use App\Models\Tagihan;
use Illuminate\Http\Request;

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

        $validated['tgl_selesai'] = date('Y-m-d', strtotime($validated['tgl_mulai'].' +1 month'));

        SiswaPaket::where('siswa_id', $validated['siswa_id'])
            ->where('kelas_id', $validated['kelas_id'])
            ->where('status', 'aktif')
            ->update(['status' => 'selesai']);

        $siswaPaket = SiswaPaket::create($validated);

        Tagihan::create([
            'siswa_id' => $validated['siswa_id'],
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

        return $this->success($paket);
    }

    public function update(Request $request, SiswaPaket $siswaPaket)
    {
        $validated = $request->validate([
            'paket_id' => 'nullable|exists:pakets,id',
            'tgl_mulai' => 'nullable|date',
            'status' => 'nullable|in:aktif,selesai',
        ]);

        if (isset($validated['tgl_mulai'])) {
            $validated['tgl_selesai'] = date('Y-m-d', strtotime($validated['tgl_mulai'].' +1 month'));
        }

        $siswaPaket->update($validated);

        return $this->success($siswaPaket->load(['siswa:id,nama,nis', 'kelas:id,nama', 'paket:id,nama,jumlah_pertemuan']), 'Paket siswa berhasil diperbarui');
    }

    public function destroy(SiswaPaket $siswaPaket)
    {
        $siswaPaket->delete();

        return $this->success(null, 'Paket siswa berhasil dihapus');
    }
}
