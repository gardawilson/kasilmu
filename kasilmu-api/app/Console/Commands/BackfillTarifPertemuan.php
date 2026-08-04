<?php

namespace App\Console\Commands;

use App\Models\Kela;
use App\Models\Pertemuan;
use Illuminate\Console\Command;

class BackfillTarifPertemuan extends Command
{
    protected $signature = 'gaji:backfill-tarif-pertemuan';

    protected $description = 'Isi tarif_per_pertemuan pada pertemuan lama (masih 0) dengan tarif kelas saat ini. Jalankan sekali setelah semua kelas sudah diisi tarifnya lewat menu Kelas.';

    public function handle(): int
    {
        $kelasTanpaTarif = Kela::where('tarif_per_pertemuan', 0)->pluck('nama');

        if ($kelasTanpaTarif->isNotEmpty()) {
            $this->warn('Kelas berikut belum diisi tarifnya, pertemuan di kelas ini akan dilewati:');
            $kelasTanpaTarif->each(fn ($nama) => $this->line("  - {$nama}"));

            if (! $this->confirm('Lanjutkan backfill untuk kelas yang sudah punya tarif?', true)) {
                $this->info('Dibatalkan.');

                return self::FAILURE;
            }
        }

        $updated = 0;

        Kela::where('tarif_per_pertemuan', '>', 0)->each(function (Kela $kela) use (&$updated) {
            $updated += Pertemuan::where('kelas_id', $kela->id)
                ->where('tarif_per_pertemuan', 0)
                ->update(['tarif_per_pertemuan' => $kela->tarif_per_pertemuan]);
        });

        $this->info("Selesai. {$updated} pertemuan diperbarui.");

        return self::SUCCESS;
    }
}
