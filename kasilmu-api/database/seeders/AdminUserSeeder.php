<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::create([
            'name'     => 'Admin Kasilmu',
            'email'    => 'admin@kasilmu.com',
            'password' => bcrypt('password'),
            'no_telp'  => '081234567890',
            'is_active'=> true,
        ]);

        $admin->assignRole('admin');

        $tutorUser = User::create([
            'name'     => 'Tutor Demo',
            'email'    => 'tutor@kasilmu.com',
            'password' => bcrypt('password'),
            'no_telp'  => '081234567891',
            'is_active'=> true,
        ]);

        $tutorUser->assignRole('tutor');

        $siswaUser = User::create([
            'name'     => 'Siswa Demo',
            'email'    => 'siswa@kasilmu.com',
            'password' => bcrypt('password'),
            'no_telp'  => '081234567892',
            'is_active'=> true,
        ]);

        $siswaUser->assignRole('siswa');
    }
}
