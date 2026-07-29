<?php

namespace App\Http\Controllers\Api;

use App\Models\Jenjang;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JenjangController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $semua = $request->boolean('semua');
        $query = Jenjang::query()
            ->when(! $semua, fn ($q) => $q->where('is_active', true))
            ->with(['tingkats' => fn ($q) => $q
                ->when(! $semua, fn ($tingkat) => $tingkat->where('is_active', true))
                ->orderBy('urutan')])
            ->orderBy('urutan');

        return $this->success($query->get());
    }

    public function show(Jenjang $jenjang)
    {
        return $this->success($jenjang->load('tingkats'));
    }

    public function store(Request $request)
    {
        $request->merge(['kode' => strtoupper((string) $request->kode)]);

        $validated = $request->validate([
            'kode' => 'required|string|max:20|unique:jenjangs,kode',
            'nama' => 'required|string|max:255',
            'urutan' => 'required|integer|min:0|unique:jenjangs,urutan',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['kode'] = strtoupper($validated['kode']);
        $jenjang = Jenjang::create($validated);

        return $this->success($jenjang, 'Jenjang berhasil ditambahkan', 201);
    }

    public function update(Request $request, Jenjang $jenjang)
    {
        $request->merge(['kode' => strtoupper((string) $request->kode)]);

        $validated = $request->validate([
            'kode' => ['required', 'string', 'max:20', Rule::unique('jenjangs', 'kode')->ignore($jenjang->id)],
            'nama' => 'required|string|max:255',
            'urutan' => ['required', 'integer', 'min:0', Rule::unique('jenjangs', 'urutan')->ignore($jenjang->id)],
            'is_active' => 'required|boolean',
        ]);

        $validated['kode'] = strtoupper($validated['kode']);
        $jenjang->update($validated);

        return $this->success($jenjang->load('tingkats'), 'Jenjang berhasil diperbarui');
    }

    public function destroy(Jenjang $jenjang)
    {
        try {
            $jenjang->delete();
        } catch (QueryException $e) {
            return $this->error('Jenjang tidak bisa dihapus karena masih memiliki tingkat', 422);
        }

        return $this->success(null, 'Jenjang berhasil dihapus');
    }
}
