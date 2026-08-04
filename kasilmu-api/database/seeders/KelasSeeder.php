<?php

namespace Database\Seeders;

use App\Models\Kela;
use App\Models\Siswa;
use Illuminate\Database\Seeder;

class KelasSeeder extends Seeder
{
    public function run(): void
    {
        $kelas = [
            ['nama' => 'Reguler SD 6A',   'mata_pelajaran' => 'Reguler SD',        'deskripsi' => 'Bimbel untuk siswa SD kelas 1-6',    'kapasitas' => 15, 'tarif_per_pertemuan' => 90000,  'ruang' => 'Ruang 1', 'status' => 'aktif', 'jenjang' => 'SD'],
            ['nama' => 'Reguler SMP 8A',  'mata_pelajaran' => 'Reguler SMP',       'deskripsi' => 'Bimbel untuk siswa SMP kelas 7-9',   'kapasitas' => 15, 'tarif_per_pertemuan' => 100000, 'ruang' => 'Ruang 2', 'status' => 'aktif', 'jenjang' => 'SMP'],
            ['nama' => 'Reguler SMA 11',  'mata_pelajaran' => 'Reguler SMA',       'deskripsi' => 'Bimbel untuk siswa SMA kelas 10-12', 'kapasitas' => 20, 'tarif_per_pertemuan' => 120000, 'ruang' => 'Ruang 3', 'status' => 'aktif', 'jenjang' => 'SMA'],
            ['nama' => 'Intensif SNBT A', 'mata_pelajaran' => 'Intensif SNBT',     'deskripsi' => 'Persiapan intensif SNBT / UTBK',     'kapasitas' => 10, 'tarif_per_pertemuan' => 120000, 'ruang' => 'Ruang 4', 'status' => 'aktif', 'jenjang' => 'SMA'],
            ['nama' => 'Privat MTK 1',    'mata_pelajaran' => 'Privat Matematika', 'deskripsi' => 'Les privat Matematika 1-on-1',       'kapasitas' => 1,  'tarif_per_pertemuan' => 150000, 'ruang' => null,    'status' => 'aktif', 'jenjang' => 'SD'],
        ];

        foreach ($kelas as $item) {
            $jenjang = $item['jenjang'];
            unset($item['jenjang']);

            $kela = Kela::create($item);

            $siswaSejenjang = Siswa::whereHas(
                'tingkat.jenjang',
                fn ($query) => $query->where('kode', $jenjang)
            )->where('status', 'aktif')->get();

            foreach ($siswaSejenjang->take($kela->kapasitas) as $siswa) {
                $kela->siswa()->attach($siswa->id, [
                    'tgl_masuk' => now()->toDateString(),
                    'status' => 'aktif',
                ]);
            }
        }
    }
}
