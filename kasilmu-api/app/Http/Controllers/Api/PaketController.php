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
        return $this->paginated(Paket::latest()->paginate($request->per_page ?? 20));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jumlah_pertemuan' => 'required|integer|min:1',
            'deskripsi' => 'nullable|string',
        ]);

        $paket = Paket::create($validated);

        return $this->success($paket, 'Paket berhasil ditambahkan', 201);
    }

    public function show(Paket $paket)
    {
        return $this->success($paket);
    }

    public function update(Request $request, Paket $paket)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jumlah_pertemuan' => 'required|integer|min:1',
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
