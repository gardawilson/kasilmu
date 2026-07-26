<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'siswa.create',
            'siswa.read',
            'siswa.update',
            'siswa.delete',

            'tutor.create',
            'tutor.read',
            'tutor.update',
            'tutor.delete',

            'kelas.create',
            'kelas.read',
            'kelas.update',
            'kelas.delete',

            'presensi.create',
            'presensi.read',

            'nilai.create',
            'nilai.read',
            'nilai.update',

            'pembayaran.create',
            'pembayaran.read',
            'pembayaran.delete',

            'laporan.read',
            'dashboard.read',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        $admin = Role::create(['name' => 'admin', 'guard_name' => 'web']);
        $admin->givePermissionTo(Permission::all());

        $tutor = Role::create(['name' => 'tutor', 'guard_name' => 'web']);
        $tutor->givePermissionTo([
            'presensi.create',
            'presensi.read',
            'nilai.create',
            'nilai.read',
            'nilai.update',
        ]);

        $siswa = Role::create(['name' => 'siswa', 'guard_name' => 'web']);
        $siswa->givePermissionTo([
            'nilai.read',
            'pembayaran.read',
        ]);

        $orangTua = Role::create(['name' => 'orang_tua', 'guard_name' => 'web']);
        $orangTua->givePermissionTo([
            'nilai.read',
            'pembayaran.read',
        ]);
    }
}
