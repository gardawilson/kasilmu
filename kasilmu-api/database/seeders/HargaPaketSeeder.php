<?php

namespace Database\Seeders;

use App\Models\HargaPaket;
use App\Models\Kela;
use App\Models\Paket;
use Illuminate\Database\Seeder;

class HargaPaketSeeder extends Seeder
{
    /**
     * Base price per pertemuan (session) for each kelas, keyed by nama kelas.
     */
    private const BASE_HARGA_PER_PERTEMUAN = [
        'Reguler SD 6A' => 25000,
        'Reguler SMP 8A' => 29000,
        'Reguler SMA 11' => 33000,
        'Intensif SNBT A' => 62000,
        'Privat MTK 1' => 42000,
    ];

    public function run(): void
    {
        $pakets = Paket::orderBy('jumlah_pertemuan')->get();

        foreach (Kela::all() as $kela) {
            $basePerPertemuan = self::BASE_HARGA_PER_PERTEMUAN[$kela->nama] ?? 25000;

            foreach ($pakets as $paket) {
                HargaPaket::updateOrCreate(
                    ['kelas_id' => $kela->id, 'paket_id' => $paket->id],
                    ['harga' => round($basePerPertemuan * $paket->jumlah_pertemuan, -3)]
                );
            }
        }
    }
}
