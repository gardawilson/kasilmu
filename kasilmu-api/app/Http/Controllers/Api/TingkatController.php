<?php

namespace App\Http\Controllers\Api;

use App\Models\Tingkat;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TingkatController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Tingkat::with('jenjang:id,kode,nama')
            ->when(! $request->boolean('semua'), fn ($q) => $q->where('is_active', true))
            ->when($request->jenjang_id, fn ($q, $jenjangId) => $q->where('jenjang_id', $jenjangId))
            ->orderBy('urutan');

        return $this->success($query->get());
    }

    public function show(Tingkat $tingkat)
    {
        return $this->success($tingkat->load('jenjang:id,kode,nama'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenjang_id' => 'required|exists:jenjangs,id',
            'nama' => [
                'required',
                'string',
                'max:255',
                Rule::unique('tingkats', 'nama')->where('jenjang_id', $request->jenjang_id),
            ],
            'urutan' => [
                'required',
                'integer',
                'min:0',
                Rule::unique('tingkats', 'urutan')->where('jenjang_id', $request->jenjang_id),
            ],
            'is_active' => 'nullable|boolean',
        ]);

        $tingkat = Tingkat::create($validated);

        return $this->success($tingkat->load('jenjang:id,kode,nama'), 'Tingkat berhasil ditambahkan', 201);
    }

    public function update(Request $request, Tingkat $tingkat)
    {
        $validated = $request->validate([
            'jenjang_id' => 'required|exists:jenjangs,id',
            'nama' => [
                'required',
                'string',
                'max:255',
                Rule::unique('tingkats', 'nama')
                    ->where('jenjang_id', $request->jenjang_id)
                    ->ignore($tingkat->id),
            ],
            'urutan' => [
                'required',
                'integer',
                'min:0',
                Rule::unique('tingkats', 'urutan')
                    ->where('jenjang_id', $request->jenjang_id)
                    ->ignore($tingkat->id),
            ],
            'is_active' => 'required|boolean',
        ]);

        $tingkat->update($validated);

        return $this->success($tingkat->load('jenjang:id,kode,nama'), 'Tingkat berhasil diperbarui');
    }

    public function destroy(Tingkat $tingkat)
    {
        try {
            $tingkat->delete();
        } catch (QueryException $e) {
            return $this->error('Tingkat tidak bisa dihapus karena masih dipakai oleh siswa', 422);
        }

        return $this->success(null, 'Tingkat berhasil dihapus');
    }
}
