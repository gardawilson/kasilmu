<?php

namespace App\Http\Controllers\Api;

use App\Models\Tutor;
use Illuminate\Http\Request;

class TutorController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Tutor::query();

        if ($search = $request->search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('nip', 'like', "%{$search}%")
                  ->orWhere('bidang_ajar', 'like', "%{$search}%");
            });
        }

        return $this->paginated($query->latest()->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nip'                  => 'required|string|max:20|unique:tutors,nip',
            'nama'                 => 'required|string|max:255',
            'email'                => 'nullable|email|max:255',
            'no_telp'              => 'nullable|string|max:20',
            'bidang_ajar'          => 'required|string|max:255',
            'tarif_per_pertemuan'  => 'required|numeric|min:0',
            'pendidikan_terakhir'  => 'nullable|string|max:100',
            'foto'                 => 'nullable|string|max:255',
        ]);

        $tutor = Tutor::create($validated);

        return $this->success($tutor, 'Tutor berhasil ditambahkan', 201);
    }

    public function show(Tutor $tutor)
    {
        $tutor->load('kelas');

        return $this->success($tutor);
    }

    public function update(Request $request, Tutor $tutor)
    {
        $validated = $request->validate([
            'nip'                  => 'required|string|max:20|unique:tutors,nip,' . $tutor->id,
            'nama'                 => 'required|string|max:255',
            'email'                => 'nullable|email|max:255',
            'no_telp'              => 'nullable|string|max:20',
            'bidang_ajar'          => 'required|string|max:255',
            'tarif_per_pertemuan'  => 'required|numeric|min:0',
            'pendidikan_terakhir'  => 'nullable|string|max:100',
            'foto'                 => 'nullable|string|max:255',
        ]);

        $tutor->update($validated);

        return $this->success($tutor, 'Tutor berhasil diperbarui');
    }

    public function destroy(Tutor $tutor)
    {
        $tutor->delete();

        return $this->success(null, 'Tutor berhasil dihapus');
    }
}
