<?php

namespace App\Console\Commands;

use App\Models\SiswaPaket;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixOrphanSiswaPaket extends Command
{
    protected $signature = 'siswa:fix-orphan-paket {--dry-run : Tampilkan yang akan diubah tanpa menyimpan}';

    protected $description = 'Bersihkan siswa_pakets berstatus aktif yang kelasnya sudah terlepas dari siswa (peninggalan bug sebelum removeSiswa ikut membersihkan paket). Jalankan sekali.';

    public function handle(): int
    {
        $dryRun = $this->option('dry-run');

        $orphans = SiswaPaket::with(['siswa', 'kelas', 'tagihan.pembayarans'])
            ->where('status', 'aktif')
            ->get()
            ->filter(fn (SiswaPaket $sp) => $sp->siswa && ! $sp->siswa->kelas()
                ->wherePivot('kelas_id', $sp->kelas_id)
                ->wherePivot('status', 'aktif')
                ->exists());

        if ($orphans->isEmpty()) {
            $this->info('Tidak ada data orphan ditemukan.');

            return self::SUCCESS;
        }

        $dihapus = 0;
        $dikembalikan = 0;
        $konflik = [];

        foreach ($orphans as $siswaPaket) {
            $sudahDibayar = $siswaPaket->tagihan?->pembayarans->isNotEmpty();
            $label = "{$siswaPaket->siswa->nama} ({$siswaPaket->siswa->nis}) — paket kelas \"{$siswaPaket->kelas?->nama}\"";

            if (! $sudahDibayar) {
                $this->line("Hapus (belum dibayar): {$label}");
                if (! $dryRun) {
                    DB::transaction(function () use ($siswaPaket) {
                        $siswaPaket->tagihan()->delete();
                        $siswaPaket->delete();
                    });
                }
                $dihapus++;

                continue;
            }

            $sudahAktifDiKelasLain = $siswaPaket->siswa->kelas()->wherePivot('status', 'aktif')->exists();
            $kelasPenuh = $siswaPaket->kelas?->isFull() ?? true;

            if (! $siswaPaket->kelas || $sudahAktifDiKelasLain || $kelasPenuh) {
                $alasan = ! $siswaPaket->kelas
                    ? 'kelas sudah tidak ada'
                    : ($sudahAktifDiKelasLain ? 'siswa sudah aktif di kelas lain' : 'kelas sudah penuh');
                $konflik[] = "{$label} — TIDAK bisa dikembalikan otomatis ({$alasan}), sudah ada pembayaran. Perlu ditinjau manual.";

                continue;
            }

            $this->line("Kembalikan ke kelas (sudah dibayar): {$label}");
            if (! $dryRun) {
                $siswaPaket->siswa->kelas()->attach($siswaPaket->kelas_id, [
                    'tgl_masuk' => $siswaPaket->tgl_mulai,
                    'status' => 'aktif',
                ]);
            }
            $dikembalikan++;
        }

        $this->newLine();
        $this->info("Selesai. {$dihapus} paket dihapus, {$dikembalikan} siswa dikembalikan ke kelasnya.");

        if ($konflik) {
            $this->warn('Butuh tinjauan manual (' . count($konflik) . '):');
            foreach ($konflik as $pesan) {
                $this->line("  - {$pesan}");
            }
        }

        if ($dryRun) {
            $this->comment('Ini mode --dry-run, tidak ada perubahan yang disimpan.');
        }

        return self::SUCCESS;
    }
}
