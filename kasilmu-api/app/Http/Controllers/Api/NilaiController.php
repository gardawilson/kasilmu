<?php

namespace App\Http\Controllers\Api;

use App\Models\Nilai;
use Illuminate\Http\Request;

class NilaiController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Nilai::with(['siswa:id,nama,nis', 'kelas:id,nama']);

        if ($siswa_id = $request->siswa_id) {
            $query->where('siswa_id', $siswa_id);
        }

        if ($kelas_id = $request->kelas_id) {
            $query->where('kelas_id', $kelas_id);
        }

        if ($jenis_nilai = $request->jenis_nilai) {
            $query->where('jenis_nilai', $jenis_nilai);
        }

        return $this->paginated($query->latest()->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id'    => 'required|exists:siswas,id',
            'kelas_id'    => 'required|exists:kelas,id',
            'jenis_nilai' => 'required|in:tugas,uts,uas',
            'nilai'       => 'required|numeric|min:0|max:100',
            'keterangan'  => 'nullable|string',
        ]);

        $nilai = Nilai::create($validated);

        return $this->success($nilai->load(['siswa:id,nama,nis', 'kelas:id,nama']), 'Nilai berhasil ditambahkan', 201);
    }

    public function show(Nilai $nilai)
    {
        $nilai->load(['siswa', 'kelas']);

        return $this->success($nilai);
    }

    public function update(Request $request, Nilai $nilai)
    {
        $validated = $request->validate([
            'siswa_id'    => 'required|exists:siswas,id',
            'kelas_id'    => 'required|exists:kelas,id',
            'jenis_nilai' => 'required|in:tugas,uts,uas',
            'nilai'       => 'required|numeric|min:0|max:100',
            'keterangan'  => 'nullable|string',
        ]);

        $nilai->update($validated);

        return $this->success($nilai->load(['siswa:id,nama,nis', 'kelas:id,nama']), 'Nilai berhasil diperbarui');
    }

    public function destroy(Nilai $nilai)
    {
        $nilai->delete();

        return $this->success(null, 'Nilai berhasil dihapus');
    }
}
