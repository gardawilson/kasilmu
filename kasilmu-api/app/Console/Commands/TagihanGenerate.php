<?php

namespace App\Console\Commands;

use App\Models\HargaPaket;
use App\Models\SiswaPaket;
use App\Models\Tagihan;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

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
            DB::transaction(function () use ($sp, $today, &$count) {
                $nextTenggat = $sp->tgl_selesai->toDateString();

                $nextPaket = SiswaPaket::where('siswa_id', $sp->siswa_id)
                    ->where('kelas_id', $sp->kelas_id)
                    ->where('status', 'terjadwal')
                    ->whereDate('tgl_mulai', '<=', $today)
                    ->orderBy('tgl_mulai')
                    ->first();

                if (! $nextPaket) {
                    $nextPaket = SiswaPaket::firstOrCreate(
                        [
                            'siswa_id' => $sp->siswa_id,
                            'kelas_id' => $sp->kelas_id,
                            'tgl_mulai' => $nextTenggat,
                        ],
                        [
                            'paket_id' => $sp->paket_id,
                            'tgl_selesai' => Carbon::parse($nextTenggat)->addMonthNoOverflow()->toDateString(),
                            'status' => 'aktif',
                        ]
                    );
                }

                $harga = HargaPaket::where('kelas_id', $nextPaket->kelas_id)
                    ->where('paket_id', $nextPaket->paket_id)
                    ->value('harga') ?? 0;

                $tagihan = Tagihan::where('siswa_paket_id', $nextPaket->id)->first()
                    ?? Tagihan::whereNull('siswa_paket_id')
                        ->where('siswa_id', $nextPaket->siswa_id)
                        ->where('jenis', 'spp')
                        ->whereDate('tenggat', $nextPaket->tgl_mulai)
                        ->first();

                if ($tagihan) {
                    $tagihan->update(['siswa_paket_id' => $nextPaket->id]);
                } else {
                    Tagihan::create([
                        'siswa_id' => $nextPaket->siswa_id,
                        'siswa_paket_id' => $nextPaket->id,
                        'jenis' => 'spp',
                        'jumlah' => $harga,
                        'tenggat' => $nextPaket->tgl_mulai,
                        'status' => 'pending',
                    ]);
                }

                $nextPaket->update(['status' => 'aktif']);
                $sp->update(['status' => 'selesai']);

                $count++;
            });
        }

        $this->info("Generated {$count} tagihan(s)");

        return self::SUCCESS;
    }
}
