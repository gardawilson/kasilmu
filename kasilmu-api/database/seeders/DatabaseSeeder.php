<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            AdminUserSeeder::class,
            TutorSeeder::class,
            SiswaSeeder::class,
            KelasSeeder::class,
        ]);
    }
}
