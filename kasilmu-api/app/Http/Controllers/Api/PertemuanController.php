<?php

namespace App\Http\Controllers\Api;

use App\Models\Pertemuan;
use App\Models\Presensi;
use App\Models\Kela;
use Illuminate\Http\Request;

class PertemuanController
{
    use ApiResponse;

    private function isOwnKelas(Request $request, Kela $kela): bool
    {
        if (! $request->user()->hasRole('tutor')) {
            return true;
        }

        return $kela->tutor_id === $request->user()->tutor?->id;
    }

    public function mulai(Request $request)
    {
        $validated = $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        $kela = Kela::findOrFail($validated['kelas_id']);

        if (! $this->isOwnKelas($request, $kela)) {
            return $this->error('Anda tidak memiliki akses ke kelas ini', 403);
        }

        $tgl = now()->toDateString();

        $pertemuan = Pertemuan::firstOrCreate(
            ['kelas_id' => $kela->id, 'tgl' => $tgl],
            [
                'pertemuan_ke' => (Pertemuan::where('kelas_id', $kela->id)->max('pertemuan_ke') ?? 0) + 1,
                'status'       => 'terlaksana',
            ]
        );

        $siswaAktif = $kela->siswa()->wherePivot('status', 'aktif')->get();

        foreach ($siswaAktif as $siswa) {
            Presensi::firstOrCreate(
                ['pertemuan_id' => $pertemuan->id, 'siswa_id' => $siswa->id],
                ['status' => 'hadir']
            );
        }

        $pertemuan->load(['kelas:id,nama', 'presensis.siswa:id,nama,nis']);

        return $this->success($pertemuan, 'Sesi pertemuan siap');
    }

    public function index(Request $request)
    {
        $query = Pertemuan::with(['kelas:id,nama']);

        if ($kelas_id = $request->kelas_id) {
            $query->where('kelas_id', $kelas_id);
        }

        return $this->paginated($query->latest('tgl')->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kelas_id'     => 'required|exists:kelas,id',
            'pertemuan_ke' => 'required|integer|min:1',
            'tgl'          => 'required|date',
            'materi'       => 'nullable|string',
            'status'       => 'nullable|in:terlaksana,libur',
        ]);

        $kela = Kela::findOrFail($validated['kelas_id']);

        if (! $this->isOwnKelas($request, $kela)) {
            return $this->error('Anda tidak memiliki akses ke kelas ini', 403);
        }

        $pertemuan = Pertemuan::create($validated);

        return $this->success($pertemuan->load('kelas:id,nama'), 'Pertemuan berhasil ditambahkan', 201);
    }

    public function show(Pertemuan $pertemuan)
    {
        $pertemuan->load(['kelas:id,nama', 'presensis.siswa:id,nama,nis']);

        return $this->success($pertemuan);
    }

    public function update(Request $request, Pertemuan $pertemuan)
    {
        $validated = $request->validate([
            'kelas_id'     => 'required|exists:kelas,id',
            'pertemuan_ke' => 'required|integer|min:1',
            'tgl'          => 'required|date',
            'materi'       => 'nullable|string',
            'status'       => 'nullable|in:terlaksana,libur',
        ]);

        if (! $this->isOwnKelas($request, $pertemuan->kelas)) {
            return $this->error('Anda tidak memiliki akses ke kelas ini', 403);
        }

        $pertemuan->update($validated);

        return $this->success($pertemuan->load('kelas:id,nama'), 'Pertemuan berhasil diperbarui');
    }

    public function destroy(Request $request, Pertemuan $pertemuan)
    {
        if (! $this->isOwnKelas($request, $pertemuan->kelas)) {
            return $this->error('Anda tidak memiliki akses ke kelas ini', 403);
        }

        $pertemuan->delete();

        return $this->success(null, 'Pertemuan berhasil dihapus');
    }

    public function presensi(Pertemuan $pertemuan)
    {
        $pertemuan->load('presensis.siswa:id,nama,nis');

        return $this->success($pertemuan->presensis);
    }

    public function storePresensi(Request $request, Pertemuan $pertemuan)
    {
        $validated = $request->validate([
            'presensi'              => 'required|array',
            'presensi.*.siswa_id'   => 'required|exists:siswas,id',
            'presensi.*.status'     => 'required|in:hadir,izin,sakit,alpha',
            'presensi.*.keterangan' => 'nullable|string',
        ]);

        if (! $this->isOwnKelas($request, $pertemuan->kelas)) {
            return $this->error('Anda tidak memiliki akses ke kelas ini', 403);
        }

        foreach ($validated['presensi'] as $item) {
            Presensi::updateOrCreate(
                [
                    'pertemuan_id' => $pertemuan->id,
                    'siswa_id'     => $item['siswa_id'],
                ],
                [
                    'status'     => $item['status'],
                    'keterangan' => $item['keterangan'] ?? null,
                ]
            );
        }

        return $this->success(null, 'Presensi berhasil disimpan');
    }

    public function byKelas(Kela $kela)
    {
        $kela->load('pertemuans.presensis.siswa:id,nama,nis');

        return $this->success($kela->pertemuans);
    }
}
