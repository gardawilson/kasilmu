<?php

namespace Database\Seeders;

use App\Models\Tutor;
use App\Models\User;
use Illuminate\Database\Seeder;

class TutorSeeder extends Seeder
{
    public function run(): void
    {
        $tutors = [
            ['nip' => 'T001', 'nama' => 'Ahmad Fauzi',       'email' => 'tutor@kasilmu.com',    'no_telp' => '0811111111', 'bidang_ajar' => 'Matematika',       'pendidikan_terakhir' => 'S1 Matematika'],
            ['nip' => 'T002', 'nama' => 'Siti Nurhaliza',    'email' => 'siti@kasilmu.com',     'no_telp' => '0811111112', 'bidang_ajar' => 'Bahasa Inggris',    'pendidikan_terakhir' => 'S1 Sastra Inggris'],
            ['nip' => 'T003', 'nama' => 'Budi Santoso',      'email' => 'budi@kasilmu.com',     'no_telp' => '0811111113', 'bidang_ajar' => 'Fisika',           'pendidikan_terakhir' => 'S1 Fisika'],
            ['nip' => 'T004', 'nama' => 'Dewi Kartika',      'email' => 'dewi@kasilmu.com',     'no_telp' => '0811111114', 'bidang_ajar' => 'Kimia',            'pendidikan_terakhir' => 'S1 Kimia'],
            ['nip' => 'T005', 'nama' => 'Rudi Hermawan',     'email' => 'rudi@kasilmu.com',     'no_telp' => '0811111115', 'bidang_ajar' => 'Bahasa Indonesia',  'pendidikan_terakhir' => 'S1 Sastra Indonesia'],
        ];

        foreach ($tutors as $tutor) {
            $user = User::firstOrCreate(
                ['email' => $tutor['email']],
                [
                    'name' => $tutor['nama'],
                    'username' => explode('@', $tutor['email'])[0],
                    'password' => bcrypt('password'),
                    'no_telp' => $tutor['no_telp'],
                    'is_active' => true,
                ]
            );

            if (! $user->hasRole('tutor')) {
                $user->assignRole('tutor');
            }

            $tutor['user_id'] = $user->id;

            Tutor::create($tutor);
        }
    }
}
