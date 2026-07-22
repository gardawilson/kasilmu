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
            ['nama' => 'Reguler SD 6A',   'mata_pelajaran' => 'Reguler SD',        'deskripsi' => 'Bimbel untuk siswa SD kelas 1-6',    'durasi_bulan' => 12, 'tutor_id' => 1, 'harga' => 300000,  'kapasitas' => 15, 'ruang' => 'Ruang 1', 'status' => 'aktif', 'jenjang' => 'SD'],
            ['nama' => 'Reguler SMP 8A',  'mata_pelajaran' => 'Reguler SMP',       'deskripsi' => 'Bimbel untuk siswa SMP kelas 7-9',   'durasi_bulan' => 12, 'tutor_id' => 2, 'harga' => 350000,  'kapasitas' => 15, 'ruang' => 'Ruang 2', 'status' => 'aktif', 'jenjang' => 'SMP'],
            ['nama' => 'Reguler SMA 11',  'mata_pelajaran' => 'Reguler SMA',       'deskripsi' => 'Bimbel untuk siswa SMA kelas 10-12', 'durasi_bulan' => 12, 'tutor_id' => 3, 'harga' => 400000,  'kapasitas' => 20, 'ruang' => 'Ruang 3', 'status' => 'aktif', 'jenjang' => 'SMA'],
            ['nama' => 'Intensif SNBT A', 'mata_pelajaran' => 'Intensif SNBT',     'deskripsi' => 'Persiapan intensif SNBT / UTBK',     'durasi_bulan' => 6,  'tutor_id' => 1, 'harga' => 750000,  'kapasitas' => 10, 'ruang' => 'Ruang 4', 'status' => 'aktif', 'jenjang' => 'SMA'],
            ['nama' => 'Privat MTK 1',    'mata_pelajaran' => 'Privat Matematika', 'deskripsi' => 'Les privat Matematika 1-on-1',       'durasi_bulan' => 3,  'tutor_id' => 1, 'harga' => 500000,  'kapasitas' => 1,  'ruang' => null,    'status' => 'aktif', 'jenjang' => 'SD'],
        ];

        foreach ($kelas as $item) {
            $jenjang = $item['jenjang'];
            unset($item['jenjang']);

            $kela = Kela::create($item);

            $siswaSejenjang = Siswa::where('jenjang', $jenjang)->where('status', 'aktif')->get();

            foreach ($siswaSejenjang->take($kela->kapasitas) as $siswa) {
                $kela->siswa()->attach($siswa->id, [
                    'tgl_masuk' => now()->toDateString(),
                    'status'    => 'aktif',
                ]);
            }
        }
    }
}
