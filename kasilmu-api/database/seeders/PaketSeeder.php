<?php

namespace Database\Seeders;

use App\Models\Paket;
use Illuminate\Database\Seeder;

class PaketSeeder extends Seeder
{
    public function run(): void
    {
        Paket::insert([
            ['nama' => 'Paket 12x Pertemuan', 'jumlah_pertemuan' => 12, 'deskripsi' => '12 pertemuan per bulan', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Paket 16x Pertemuan', 'jumlah_pertemuan' => 16, 'deskripsi' => '16 pertemuan per bulan', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Paket 20x Pertemuan', 'jumlah_pertemuan' => 20, 'deskripsi' => '20 pertemuan per bulan', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
