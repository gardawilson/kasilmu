<?php

namespace Database\Seeders;

use App\Models\Jenjang;
use App\Models\Tingkat;
use Illuminate\Database\Seeder;

class MasterPendidikanSeeder extends Seeder
{
    public function run(): void
    {
        $master = [
            ['kode' => 'SD', 'nama' => 'Sekolah Dasar', 'urutan' => 1, 'tingkats' => range(1, 6)],
            ['kode' => 'SMP', 'nama' => 'Sekolah Menengah Pertama', 'urutan' => 2, 'tingkats' => range(7, 9)],
            ['kode' => 'SMA', 'nama' => 'Sekolah Menengah Atas', 'urutan' => 3, 'tingkats' => range(10, 12)],
        ];

        foreach ($master as $item) {
            $jenjang = Jenjang::updateOrCreate(
                ['kode' => $item['kode']],
                [
                    'nama' => $item['nama'],
                    'urutan' => $item['urutan'],
                    'is_active' => true,
                ]
            );

            foreach ($item['tingkats'] as $urutan) {
                Tingkat::updateOrCreate(
                    ['jenjang_id' => $jenjang->id, 'urutan' => $urutan],
                    ['nama' => 'Tingkat '.$urutan, 'is_active' => true]
                );
            }
        }
    }
}
