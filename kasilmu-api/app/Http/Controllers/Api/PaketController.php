<?php

namespace App\Http\Controllers\Api;

use App\Models\Paket;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class PaketController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Paket::query()->with('kelas:id,nama');

        if ($request->kelas_id) {
            $query->where('kelas_id', $request->kelas_id);
        }

        return $this->paginated($query->latest()->paginate($request->per_page ?? 100));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'nama' => 'required|string|max:255',
            'jumlah_pertemuan' => 'required|integer|min:1',
            'harga' => 'required|numeric|min:0',
            'deskripsi' => 'nullable|string',
        ]);

        $paket = Paket::create($validated);

        return $this->success($paket, 'Paket berhasil ditambahkan', 201);
    }

    public function show(Paket $paket)
    {
        return $this->success($paket->load('kelas:id,nama'));
    }

    public function update(Request $request, Paket $paket)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jumlah_pertemuan' => 'required|integer|min:1',
            'harga' => 'required|numeric|min:0',
            'deskripsi' => 'nullable|string',
        ]);

        $paket->update($validated);

        return $this->success($paket, 'Paket berhasil diperbarui');
    }

    public function destroy(Paket $paket)
    {
        try {
            $paket->delete();
        } catch (QueryException $e) {
            return $this->error('Paket tidak bisa dihapus karena masih dipakai oleh siswa', 422);
        }

        return $this->success(null, 'Paket berhasil dihapus');
    }
}
