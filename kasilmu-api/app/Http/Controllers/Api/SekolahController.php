<?php

namespace App\Http\Controllers\Api;

use App\Models\Sekolah;
use Illuminate\Http\Request;

class SekolahController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Sekolah::query();

        if ($search = $request->search) {
            $query->where('nama', 'like', "%{$search}%");
        }

        return $this->success($query->orderBy('nama')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:sekolahs,nama',
        ]);

        $sekolah = Sekolah::create($validated);

        return $this->success($sekolah, 'Sekolah berhasil ditambahkan', 201);
    }

    public function update(Request $request, Sekolah $sekolah)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:sekolahs,nama,' . $sekolah->id,
        ]);

        $sekolah->update($validated);

        return $this->success($sekolah, 'Sekolah berhasil diperbarui');
    }

    public function destroy(Sekolah $sekolah)
    {
        $sekolah->delete();

        return $this->success(null, 'Sekolah berhasil dihapus');
    }
}
