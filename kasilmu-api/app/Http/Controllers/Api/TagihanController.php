<?php

namespace App\Http\Controllers\Api;

use App\Models\Tagihan;
use Illuminate\Http\Request;

class TagihanController
{
    use ApiResponse, TutorScope;

    public function index(Request $request)
    {
        $query = Tagihan::with(['siswa:id,nama,nis']);

        $kelasIds = $this->tutorKelasIds($request);

        if ($kelasIds !== null) {
            $query->whereHas('siswa.kelas', fn ($q) => $q->whereIn('kelas.id', $kelasIds));
        }

        if ($siswa_id = $request->siswa_id) {
            $query->where('siswa_id', $siswa_id);
        }

        if ($status = $request->status) {
            $query->where('status', $status);
        }

        return $this->paginated($query->latest()->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswas,id',
            'jenis' => 'required|in:daftar,spp',
            'jumlah' => 'required|numeric|min:0',
            'tenggat' => 'nullable|date',
        ]);

        $tagihan = Tagihan::create($validated);

        return $this->success($tagihan->load('siswa:id,nama,nis'), 'Tagihan berhasil dibuat', 201);
    }

    public function show(Request $request, Tagihan $tagihan)
    {
        $kelasIds = $this->tutorKelasIds($request);

        if ($kelasIds !== null) {
            $siswaKelasIds = $tagihan->siswa->kelas->pluck('id');
            if ($siswaKelasIds->intersect($kelasIds)->isEmpty()) {
                return $this->error('Anda tidak memiliki akses ke tagihan ini', 403);
            }
        }

        $tagihan->load(['siswa', 'pembayarans']);

        return $this->success($tagihan);
    }

    public function update(Request $request, Tagihan $tagihan)
    {
        $validated = $request->validate([
            'jenis' => 'required|in:daftar,spp',
            'jumlah' => 'required|numeric|min:0',
            'tenggat' => 'nullable|date',
            'status' => 'nullable|in:pending,lunas,kadaluarsa',
        ]);

        $tagihan->update($validated);

        return $this->success($tagihan->load('siswa:id,nama,nis'), 'Tagihan berhasil diperbarui');
    }

    public function destroy(Tagihan $tagihan)
    {
        $tagihan->delete();

        return $this->success(null, 'Tagihan berhasil dihapus');
    }
}
