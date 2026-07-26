<?php

namespace App\Console\Commands;

use App\Models\SiswaPaket;
use App\Models\Tagihan;
use Illuminate\Console\Command;

class TagihanGenerate extends Command
{
    protected $signature = 'tagihan:generate';

    protected $description = 'Generate tagihan SPP untuk periode berikutnya';

    public function handle(): int
    {
        $today = now()->toDateString();

        $siswaPakets = SiswaPaket::with(['siswa', 'kelas', 'paket'])
            ->where('status', 'aktif')
            ->whereDate('tgl_selesai', '<=', $today)
            ->get();

        $count = 0;

        foreach ($siswaPakets as $sp) {
            $nextTenggat = date('Y-m-d', strtotime($sp->tgl_selesai));

            $existing = Tagihan::where('siswa_id', $sp->siswa_id)
                ->where('jenis', 'spp')
                ->whereDate('tenggat', $nextTenggat)
                ->exists();

            if ($existing) {
                continue;
            }

            $harga = $sp->kelas?->harga ?? 0;

            Tagihan::create([
                'siswa_id' => $sp->siswa_id,
                'jenis' => 'spp',
                'jumlah' => $harga,
                'tenggat' => $nextTenggat,
                'status' => 'pending',
            ]);

            SiswaPaket::create([
                'siswa_id' => $sp->siswa_id,
                'kelas_id' => $sp->kelas_id,
                'paket_id' => $sp->paket_id,
                'tgl_mulai' => $nextTenggat,
                'tgl_selesai' => date('Y-m-d', strtotime($nextTenggat.' +1 month')),
                'status' => 'aktif',
            ]);

            $sp->update(['status' => 'selesai']);

            $count++;
        }

        $this->info("Generated {$count} tagihan(s)");

        return self::SUCCESS;
    }
}
