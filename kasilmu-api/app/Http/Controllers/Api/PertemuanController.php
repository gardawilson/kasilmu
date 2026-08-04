<?php

namespace App\Http\Controllers\Api;

use App\Models\Kela;
use App\Models\Pertemuan;
use App\Models\Presensi;
use App\Models\SiswaPaket;
use Illuminate\Http\Request;

class PertemuanController
{
    use ApiResponse, TutorScope;

    private function isOwnPertemuan(Request $request, Pertemuan $pertemuan): bool
    {
        if (! $request->user()->hasRole('tutor')) {
            return true;
        }

        if ($pertemuan->tutor_id === null) {
            return true;
        }

        return $pertemuan->tutor_id === $request->user()->tutor?->id;
    }

    /**
     * pertemuan_ke selalu dihitung otomatis, tidak pernah diterima dari input
     * client — supaya nomornya benar-benar jadi penanda urutan, bukan angka
     * bebas yang bisa salah ketik/duplikat. Constraint unik (kelas_id,
     * pertemuan_ke) di database jadi jaring pengaman kalau ada request
     * bersamaan yang menghitung nomor yang sama.
     */
    private function nextPertemuanKe(int $kelasId): int
    {
        return (Pertemuan::where('kelas_id', $kelasId)->max('pertemuan_ke') ?? 0) + 1;
    }

    public function mulai(Request $request)
    {
        $validated = $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'tgl' => 'nullable|date',
            'tutor_id' => 'nullable|exists:tutors,id',
        ]);

        $kela = Kela::findOrFail($validated['kelas_id']);
        $tgl = $validated['tgl'] ?? now()->toDateString();
        $tutorId = $request->user()->hasRole('tutor')
            ? $request->user()->tutor?->id
            : ($validated['tutor_id'] ?? null);

        $siswaAktif = $kela->siswa()->wherePivot('status', 'aktif')->get();

        $siswaTanpaPaket = $siswaAktif->reject(fn ($siswa) => SiswaPaket::where('siswa_id', $siswa->id)
            ->where('kelas_id', $kela->id)
            ->where('status', 'aktif')
            ->exists());

        if ($siswaTanpaPaket->isNotEmpty()) {
            return $this->error(
                'Tidak bisa memulai sesi, masih ada siswa yang belum memiliki paket aktif: '.$siswaTanpaPaket->pluck('nama')->implode(', '),
                422
            );
        }

        $existing = Pertemuan::with('tutor:id,nama')->where('kelas_id', $kela->id)->where('tgl', $tgl)->first();

        if ($existing && $existing->tutor_id !== null && $existing->tutor_id !== $tutorId) {
            $namaTutorLain = $existing->tutor?->nama ?? 'pengajar lain';

            return $this->error(
                "Sesi untuk kelas ini pada tanggal {$tgl} sudah dimulai oleh {$namaTutorLain}.",
                422
            );
        }

        $pertemuan = Pertemuan::firstOrCreate(
            ['kelas_id' => $kela->id, 'tgl' => $tgl],
            [
                'pertemuan_ke' => $this->nextPertemuanKe($kela->id),
                'status' => 'berlangsung',
                'tutor_id' => $tutorId,
                'tarif_per_pertemuan' => $kela->tarif_per_pertemuan,
            ]
        );

        foreach ($siswaAktif as $siswa) {
            Presensi::firstOrCreate(
                ['pertemuan_id' => $pertemuan->id, 'siswa_id' => $siswa->id],
                ['status' => 'hadir']
            );
        }

        $pertemuan->load(['kelas:id,nama', 'tutor:id,nama', 'presensis.siswa:id,nama,nis']);

        $pertemuan->presensis->each(function ($presensi) use ($pertemuan) {
            $siswaPaket = SiswaPaket::with('paket')
                ->where('siswa_id', $presensi->siswa_id)
                ->where('kelas_id', $pertemuan->kelas_id)
                ->where('status', 'aktif')
                ->first();

            $presensi->sisa_pertemuan = $siswaPaket?->sisa_pertemuan;
            $presensi->kuota = $siswaPaket?->paket?->jumlah_pertemuan;
        });

        return $this->success($pertemuan, 'Sesi pertemuan siap');
    }

    public function index(Request $request)
    {
        $query = Pertemuan::with(['kelas:id,nama', 'tutor:id,nama']);

        if ($kelas_id = $request->kelas_id) {
            $query->where('kelas_id', $kelas_id);
        }

        if ($tgl = $request->tgl) {
            $query->where('tgl', $tgl);
        }

        return $this->paginated($query->latest('tgl')->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'tgl' => 'required|date',
            'materi' => 'nullable|string',
            'status' => 'nullable|in:berlangsung,selesai,libur',
            'tutor_id' => 'nullable|exists:tutors,id',
        ]);

        $validated['tutor_id'] = $request->user()->hasRole('tutor')
            ? $request->user()->tutor?->id
            : ($validated['tutor_id'] ?? null);

        $validated['tarif_per_pertemuan'] = Kela::findOrFail($validated['kelas_id'])->tarif_per_pertemuan;
        $validated['pertemuan_ke'] = $this->nextPertemuanKe($validated['kelas_id']);

        $pertemuan = Pertemuan::create($validated);

        return $this->success($pertemuan->load(['kelas:id,nama', 'tutor:id,nama']), 'Pertemuan berhasil ditambahkan', 201);
    }

    public function show(Pertemuan $pertemuan)
    {
        $pertemuan->load(['kelas:id,nama', 'tutor:id,nama', 'presensis.siswa:id,nama,nis']);

        $pertemuan->presensis->each(function ($presensi) use ($pertemuan) {
            $siswaPaket = SiswaPaket::with('paket')
                ->where('siswa_id', $presensi->siswa_id)
                ->where('kelas_id', $pertemuan->kelas_id)
                ->where('status', 'aktif')
                ->first();

            $presensi->sisa_pertemuan = $siswaPaket?->sisa_pertemuan;
            $presensi->kuota = $siswaPaket?->paket?->jumlah_pertemuan;
        });

        return $this->success($pertemuan);
    }

    public function update(Request $request, Pertemuan $pertemuan)
    {
        $validated = $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'tgl' => 'required|date',
            'materi' => 'nullable|string',
            'status' => 'nullable|in:berlangsung,selesai,libur',
            'tutor_id' => 'nullable|exists:tutors,id',
        ]);

        if (! $this->isOwnPertemuan($request, $pertemuan)) {
            return $this->error('Anda tidak memiliki akses ke pertemuan ini', 403);
        }

        if ($request->user()->hasRole('tutor')) {
            unset($validated['tutor_id']);
        }

        $validated['tarif_per_pertemuan'] = Kela::findOrFail($validated['kelas_id'])->tarif_per_pertemuan;

        // Pindah kelas berarti pertemuan_ke lama (urutan di kelas asal) sudah
        // tidak relevan — hitung ulang urutannya di kelas tujuan.
        if ($validated['kelas_id'] !== $pertemuan->kelas_id) {
            $validated['pertemuan_ke'] = $this->nextPertemuanKe($validated['kelas_id']);
        }

        $pertemuan->update($validated);

        return $this->success($pertemuan->load(['kelas:id,nama', 'tutor:id,nama']), 'Pertemuan berhasil diperbarui');
    }

    public function selesai(Request $request, Pertemuan $pertemuan)
    {
        if (! $this->isOwnPertemuan($request, $pertemuan)) {
            return $this->error('Anda tidak memiliki akses ke pertemuan ini', 403);
        }

        if ($pertemuan->status !== 'berlangsung') {
            return $this->error('Pertemuan ini sudah tidak berstatus berlangsung', 422);
        }

        $pertemuan->update(['status' => 'selesai']);

        return $this->success($pertemuan->fresh()->load(['kelas:id,nama', 'tutor:id,nama']), 'Pertemuan ditandai selesai');
    }

    public function destroy(Request $request, Pertemuan $pertemuan)
    {
        if (! $this->isOwnPertemuan($request, $pertemuan)) {
            return $this->error('Anda tidak memiliki akses ke pertemuan ini', 403);
        }

        $pertemuan->delete();

        return $this->success(null, 'Pertemuan berhasil dihapus');
    }

    public function presensi(Pertemuan $pertemuan)
    {
        $pertemuan->load('presensis.siswa:id,nama,nis');

        $result = $pertemuan->presensis->map(function ($presensi) use ($pertemuan) {
            $siswaPaket = SiswaPaket::with('paket')
                ->where('siswa_id', $presensi->siswa_id)
                ->where('kelas_id', $pertemuan->kelas_id)
                ->where('status', 'aktif')
                ->first();

            $presensi->sisa_pertemuan = $siswaPaket?->sisa_pertemuan;
            $presensi->kuota = $siswaPaket?->paket?->jumlah_pertemuan;

            return $presensi;
        });

        return $this->success($result);
    }

    public function storePresensi(Request $request, Pertemuan $pertemuan)
    {
        $validated = $request->validate([
            'presensi' => 'required|array',
            'presensi.*.siswa_id' => 'required|exists:siswas,id',
            'presensi.*.status' => 'required|in:hadir,tidak_hadir',
            'presensi.*.keterangan' => 'nullable|string',
            'presensi.*.catatan' => 'nullable|string',
        ]);

        if (! $this->isOwnPertemuan($request, $pertemuan)) {
            return $this->error('Anda tidak memiliki akses ke pertemuan ini', 403);
        }

        foreach ($validated['presensi'] as $item) {
            Presensi::updateOrCreate(
                [
                    'pertemuan_id' => $pertemuan->id,
                    'siswa_id' => $item['siswa_id'],
                ],
                [
                    'status' => $item['status'],
                    'keterangan' => $item['keterangan'] ?? null,
                    'catatan' => $item['catatan'] ?? null,
                ]
            );
        }

        return $this->success(null, 'Presensi berhasil disimpan');
    }

    public function byKelas(Request $request, Kela $kela)
    {
        $kelasIds = $this->tutorKelasIds($request);

        if ($kelasIds !== null && ! in_array($kela->id, $kelasIds)) {
            return $this->error('Anda tidak memiliki akses ke kelas ini', 403);
        }

        $kela->load('pertemuans.presensis.siswa:id,nama,nis');

        return $this->success($kela->pertemuans);
    }
}
