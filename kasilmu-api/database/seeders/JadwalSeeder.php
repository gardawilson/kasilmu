<?php

namespace Database\Seeders;

use App\Models\Jadwal;
use Illuminate\Database\Seeder;

class JadwalSeeder extends Seeder
{
    public function run(): void
    {
        $jadwals = [
            ['kelas_id' => 1, 'hari' => 'Senin', 'jam_mulai' => '15:00', 'jam_selesai' => '16:30', 'ruang' => 'Ruang 1'],
            ['kelas_id' => 1, 'hari' => 'Kamis', 'jam_mulai' => '15:00', 'jam_selesai' => '16:30', 'ruang' => 'Ruang 1'],
            ['kelas_id' => 1, 'hari' => 'Minggu', 'jam_mulai' => '09:00', 'jam_selesai' => '10:30', 'ruang' => 'Ruang 1'],
            ['kelas_id' => 2, 'hari' => 'Senin', 'jam_mulai' => '09:00', 'jam_selesai' => '10:30', 'ruang' => 'Ruang 2'],
            ['kelas_id' => 3, 'hari' => 'Selasa', 'jam_mulai' => '09:00', 'jam_selesai' => '10:30', 'ruang' => 'Ruang 3'],
            ['kelas_id' => 4, 'hari' => 'Selasa', 'jam_mulai' => '16:00', 'jam_selesai' => '17:30', 'ruang' => 'Ruang 4'],
            ['kelas_id' => 4, 'hari' => 'Jumat', 'jam_mulai' => '16:00', 'jam_selesai' => '17:30', 'ruang' => 'Ruang 4'],
            ['kelas_id' => 5, 'hari' => 'Rabu', 'jam_mulai' => '14:00', 'jam_selesai' => '15:00', 'ruang' => null],
            ['kelas_id' => 5, 'hari' => 'Sabtu', 'jam_mulai' => '10:00', 'jam_selesai' => '11:00', 'ruang' => null],
        ];

        foreach ($jadwals as $jadwal) {
            Jadwal::create($jadwal);
        }
    }
}
