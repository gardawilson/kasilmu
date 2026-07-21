<?php

namespace App\Http\Controllers\Api;

use App\Models\Tagihan;
use App\Models\Pembayaran;
use Illuminate\Http\Request;

class TagihanController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Tagihan::with(['siswa:id,nama,nis']);

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
            'jenis'    => 'required|in:daftar,spp',
            'jumlah'   => 'required|numeric|min:0',
            'tenggat'  => 'nullable|date',
        ]);

        $tagihan = Tagihan::create($validated);

        return $this->success($tagihan->load('siswa:id,nama,nis'), 'Tagihan berhasil dibuat', 201);
    }

    public function show(Tagihan $tagihan)
    {
        $tagihan->load(['siswa', 'pembayarans']);

        return $this->success($tagihan);
    }

    public function update(Request $request, Tagihan $tagihan)
    {
        $validated = $request->validate([
            'jenis'   => 'required|in:daftar,spp',
            'jumlah'  => 'required|numeric|min:0',
            'tenggat' => 'nullable|date',
            'status'  => 'nullable|in:pending,lunas,kadaluarsa',
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
