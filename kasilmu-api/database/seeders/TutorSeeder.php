<?php

namespace Database\Seeders;

use App\Models\Tutor;
use App\Models\User;
use Illuminate\Database\Seeder;

class TutorSeeder extends Seeder
{
    public function run(): void
    {
        $demoTutorUserId = User::where('email', 'tutor@kasilmu.com')->value('id');

        $tutors = [
            ['nip' => 'T001', 'nama' => 'Ahmad Fauzi',       'email' => 'ahmad@kasilmu.com',    'no_telp' => '0811111111', 'bidang_ajar' => 'Matematika',       'tarif_per_pertemuan' => 100000, 'pendidikan_terakhir' => 'S1 Matematika', 'user_id' => $demoTutorUserId],
            ['nip' => 'T002', 'nama' => 'Siti Nurhaliza',    'email' => 'siti@kasilmu.com',     'no_telp' => '0811111112', 'bidang_ajar' => 'Bahasa Inggris',    'tarif_per_pertemuan' => 100000, 'pendidikan_terakhir' => 'S1 Sastra Inggris'],
            ['nip' => 'T003', 'nama' => 'Budi Santoso',      'email' => 'budi@kasilmu.com',     'no_telp' => '0811111113', 'bidang_ajar' => 'Fisika',           'tarif_per_pertemuan' => 120000, 'pendidikan_terakhir' => 'S1 Fisika'],
            ['nip' => 'T004', 'nama' => 'Dewi Kartika',      'email' => 'dewi@kasilmu.com',     'no_telp' => '0811111114', 'bidang_ajar' => 'Kimia',            'tarif_per_pertemuan' => 120000, 'pendidikan_terakhir' => 'S1 Kimia'],
            ['nip' => 'T005', 'nama' => 'Rudi Hermawan',     'email' => 'rudi@kasilmu.com',     'no_telp' => '0811111115', 'bidang_ajar' => 'Bahasa Indonesia',  'tarif_per_pertemuan' => 90000,  'pendidikan_terakhir' => 'S1 Sastra Indonesia'],
        ];

        foreach ($tutors as $tutor) {
            Tutor::create($tutor);
        }
    }
}
