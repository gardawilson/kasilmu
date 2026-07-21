<?php

namespace App\Http\Controllers\Api;

use App\Models\Jadwal;
use App\Models\Kela;
use Illuminate\Http\Request;

class JadwalController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Jadwal::with(['kelas:id,nama']);

        if ($kelas_id = $request->kelas_id) {
            $query->where('kelas_id', $kelas_id);
        }

        if ($hari = $request->hari) {
            $query->where('hari', $hari);
        }

        return $this->paginated($query->latest('hari')->paginate($request->per_page ?? 20));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kelas_id'    => 'required|exists:kelas,id',
            'hari'        => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jam_mulai'   => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'ruang'       => 'nullable|string|max:50',
        ]);

        $jadwal = Jadwal::create($validated);

        return $this->success($jadwal->load('kelas:id,nama'), 'Jadwal berhasil ditambahkan', 201);
    }

    public function show(Jadwal $jadwal)
    {
        $jadwal->load('kelas');

        return $this->success($jadwal);
    }

    public function update(Request $request, Jadwal $jadwal)
    {
        $validated = $request->validate([
            'kelas_id'    => 'required|exists:kelas,id',
            'hari'        => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jam_mulai'   => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'ruang'       => 'nullable|string|max:50',
        ]);

        $jadwal->update($validated);

        return $this->success($jadwal->load('kelas:id,nama'), 'Jadwal berhasil diperbarui');
    }

    public function destroy(Jadwal $jadwal)
    {
        $jadwal->delete();

        return $this->success(null, 'Jadwal berhasil dihapus');
    }

    public function byKelas(Kela $kela)
    {
        return $this->success($kela->jadwals);
    }
}
