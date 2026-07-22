<?php

namespace App\Http\Controllers\Api;

use App\Models\Jadwal;
use App\Models\Kela;
use Illuminate\Http\Request;

class JadwalController
{
    use ApiResponse;

    private const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    private function isOwnKelas(Request $request, Kela $kela): bool
    {
        if (! $request->user()->hasRole('tutor')) {
            return true;
        }

        return $kela->tutor_id === $request->user()->tutor?->id;
    }

    public function hariIni(Request $request)
    {
        $hari = self::HARI[now()->dayOfWeek];

        $query = Jadwal::with(['kelas:id,nama,mata_pelajaran,tutor_id'])
            ->where('hari', $hari);

        if ($request->user()->hasRole('tutor')) {
            $tutorId = $request->user()->tutor?->id;
            $query->whereHas('kelas', fn ($q) => $q->where('tutor_id', $tutorId));
        }

        return $this->success($query->orderBy('jam_mulai')->get());
    }

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

        $kela = Kela::findOrFail($validated['kelas_id']);

        if (! $this->isOwnKelas($request, $kela)) {
            return $this->error('Anda tidak memiliki akses ke kelas ini', 403);
        }

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

        if (! $this->isOwnKelas($request, $jadwal->kelas)) {
            return $this->error('Anda tidak memiliki akses ke kelas ini', 403);
        }

        $jadwal->update($validated);

        return $this->success($jadwal->load('kelas:id,nama'), 'Jadwal berhasil diperbarui');
    }

    public function destroy(Request $request, Jadwal $jadwal)
    {
        if (! $this->isOwnKelas($request, $jadwal->kelas)) {
            return $this->error('Anda tidak memiliki akses ke kelas ini', 403);
        }

        $jadwal->delete();

        return $this->success(null, 'Jadwal berhasil dihapus');
    }

    public function byKelas(Kela $kela)
    {
        return $this->success($kela->jadwals);
    }
}
