<?php

namespace Database\Seeders;

use App\Models\Kela;
use App\Models\Paket;
use Illuminate\Database\Seeder;

class PaketSeeder extends Seeder
{
    /** Template paket per kelas + basis harga per pertemuan per nama kelas. */
    private const TEMPLATES = [
        ['nama' => 'Paket 12x Pertemuan', 'jumlah_pertemuan' => 12, 'deskripsi' => '12 pertemuan per bulan'],
        ['nama' => 'Paket 16x Pertemuan', 'jumlah_pertemuan' => 16, 'deskripsi' => '16 pertemuan per bulan'],
        ['nama' => 'Paket 20x Pertemuan', 'jumlah_pertemuan' => 20, 'deskripsi' => '20 pertemuan per bulan'],
    ];

    private const BASE_HARGA_PER_PERTEMUAN = [
        'Reguler SD 6A' => 25000,
        'Reguler SMP 8A' => 29000,
        'Reguler SMA 11' => 33000,
        'Intensif SNBT A' => 62000,
        'Privat MTK 1' => 42000,
    ];

    public function run(): void
    {
        foreach (Kela::all() as $kela) {
            $basePerPertemuan = self::BASE_HARGA_PER_PERTEMUAN[$kela->nama] ?? 25000;

            foreach (self::TEMPLATES as $template) {
                Paket::create([
                    'kelas_id' => $kela->id,
                    'nama' => $template['nama'],
                    'jumlah_pertemuan' => $template['jumlah_pertemuan'],
                    'deskripsi' => $template['deskripsi'],
                    'harga' => round($basePerPertemuan * $template['jumlah_pertemuan'], -3),
                ]);
            }
        }
    }
}
