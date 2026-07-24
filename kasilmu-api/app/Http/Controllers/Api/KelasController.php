<?php

namespace App\Http\Controllers\Api;

use App\Models\Kela;
use Illuminate\Http\Request;

class KelasController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Kela::with(['tutor:id,nama'])
            ->withCount(['siswa' => fn ($q) => $q->where('kelas_siswa.status', 'aktif')])
            ->withCount('pertemuans');

        if ($search = $request->search) {
            $query->where('nama', 'like', "%{$search}%");
        }

        if ($status = $request->status) {
            $query->where('status', $status);
        }

        if ($tutor_id = $request->tutor_id) {
            $query->where('tutor_id', $tutor_id);
        }

        return $this->paginated($query->latest()->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'           => 'required|string|max:255',
            'mata_pelajaran' => 'required|string|max:255',
            'deskripsi'      => 'nullable|string',
            'durasi_bulan'   => 'required|integer|min:1',
            'tutor_id'       => 'required|exists:tutors,id',
            'harga'          => 'required|numeric|min:0',
            'kapasitas'      => 'required|integer|min:1',
            'ruang'          => 'nullable|string|max:50',
            'status'         => 'nullable|in:aktif,selesai',
        ]);

        $kelas = Kela::create($validated);

        return $this->success($kelas->load(['tutor:id,nama']), 'Kelas berhasil ditambahkan', 201);
    }

    public function show(Kela $kela)
    {
        $kela->load(['tutor', 'siswa.sekolah', 'jadwals', 'pertemuans']);
        $kela->loadCount('pertemuans');

        return $this->success($kela);
    }

    public function update(Request $request, Kela $kela)
    {
        $validated = $request->validate([
            'nama'           => 'required|string|max:255',
            'mata_pelajaran' => 'required|string|max:255',
            'deskripsi'      => 'nullable|string',
            'durasi_bulan'   => 'required|integer|min:1',
            'tutor_id'       => 'required|exists:tutors,id',
            'harga'          => 'required|numeric|min:0',
            'kapasitas'      => 'required|integer|min:1',
            'ruang'          => 'nullable|string|max:50',
            'status'         => 'nullable|in:aktif,selesai',
        ]);

        $kela->update($validated);

        return $this->success($kela->load(['tutor:id,nama']), 'Kelas berhasil diperbarui');
    }

    public function destroy(Kela $kela)
    {
        $kela->delete();

        return $this->success(null, 'Kelas berhasil dihapus');
    }

    public function addSiswa(Request $request, Kela $kela)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswas,id',
        ]);

        $exists = $kela->siswa()->where('siswa_id', $validated['siswa_id'])->exists();

        if ($exists) {
            return $this->error('Siswa sudah terdaftar di kelas ini', 422);
        }

        if ($kela->isFull()) {
            return $this->error("Kelas sudah penuh (kapasitas {$kela->kapasitas} orang)", 422);
        }

        $kela->siswa()->attach($validated['siswa_id'], [
            'tgl_masuk' => now()->toDateString(),
            'status'    => 'aktif',
        ]);

        return $this->success(null, 'Siswa berhasil ditambahkan ke kelas');
    }

    public function removeSiswa(Kela $kela, $siswaId)
    {
        $kela->siswa()->where('siswa_id', $siswaId)->delete();

        return $this->success(null, 'Siswa berhasil dikeluarkan dari kelas');
    }
}
