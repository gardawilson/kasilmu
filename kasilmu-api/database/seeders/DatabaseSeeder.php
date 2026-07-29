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
            MasterPendidikanSeeder::class,
            SiswaSeeder::class,
            KelasSeeder::class,
            PaketSeeder::class,
            HargaPaketSeeder::class,
        ]);
    }
}
