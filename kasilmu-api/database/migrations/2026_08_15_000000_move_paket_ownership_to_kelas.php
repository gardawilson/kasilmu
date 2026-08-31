<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Paket berpindah kepemilikan: dari master global -> milik satu kelas.
 *
 * - `pakets` dapat kolom `kelas_id` + `harga` (harga sebelumnya di `harga_pakets`).
 * - Data `harga_pakets` dipindahkan; paket yang dipakai >1 kelas diduplikasi
 *   per kelas dan `siswa_pakets.paket_id` diarahkan ulang sesuai kelasnya.
 * - Paket master yang tidak pernah ditawarkan kelas manapun (tak dipakai) dihapus.
 * - `harga_pakets` dihapus.
 *
 * CATATAN: backup DB sebelum menjalankan di produksi. Tidak sepenuhnya reversible
 * (penggabungan harga hilang saat rollback kolom).
 */
return new class extends Migration
{
    public function up(): void
    {
        // Kolom ditambahkan nullable dulu (tanpa FK) supaya bisa diisi saat migrasi data.
        Schema::table('pakets', function (Blueprint $table) {
            $table->unsignedBigInteger('kelas_id')->nullable()->after('id');
            $table->decimal('harga', 12, 2)->default(0)->after('jumlah_pertemuan');
        });

        if (Schema::hasTable('harga_pakets')) {
            $rows = DB::table('harga_pakets')->orderBy('paket_id')->orderBy('id')->get();
            $sudahDipakai = []; // paket_id => true (baris pertama mengisi paket asli)

            foreach ($rows as $row) {
                if (! isset($sudahDipakai[$row->paket_id])) {
                    DB::table('pakets')->where('id', $row->paket_id)->update([
                        'kelas_id' => $row->kelas_id,
                        'harga' => $row->harga,
                        'updated_at' => now(),
                    ]);
                    $sudahDipakai[$row->paket_id] = true;

                    continue;
                }

                // Paket dipakai kelas lain -> duplikasi paket khusus kelas itu.
                $src = DB::table('pakets')->where('id', $row->paket_id)->first();
                $newId = DB::table('pakets')->insertGetId([
                    'kelas_id' => $row->kelas_id,
                    'nama' => $src->nama,
                    'jumlah_pertemuan' => $src->jumlah_pertemuan,
                    'harga' => $row->harga,
                    'deskripsi' => $src->deskripsi,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                DB::table('siswa_pakets')
                    ->where('paket_id', $row->paket_id)
                    ->where('kelas_id', $row->kelas_id)
                    ->update(['paket_id' => $newId, 'updated_at' => now()]);
            }
        }

        // Paket tanpa harga tapi masih direferensikan siswa_pakets -> beri rumah, harga 0.
        $yatimDipakai = DB::table('pakets')
            ->whereNull('kelas_id')
            ->whereIn('id', fn ($q) => $q->select('paket_id')->from('siswa_pakets'))
            ->pluck('id');

        foreach ($yatimDipakai as $paketId) {
            $kelasId = DB::table('siswa_pakets')->where('paket_id', $paketId)->value('kelas_id');
            DB::table('pakets')->where('id', $paketId)->update([
                'kelas_id' => $kelasId,
                'harga' => 0,
                'updated_at' => now(),
            ]);
        }

        // Paket tak terpakai (tanpa kelas, tanpa referensi) -> hapus.
        DB::table('pakets')->whereNull('kelas_id')->delete();

        Schema::dropIfExists('harga_pakets');

        // Setiap baris kini punya kelas_id -> jadikan NOT NULL + pasang FK.
        Schema::table('pakets', function (Blueprint $table) {
            $table->unsignedBigInteger('kelas_id')->nullable(false)->change();
            $table->foreign('kelas_id')->references('id')->on('kelas')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::create('harga_pakets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->foreignId('paket_id')->constrained('pakets')->cascadeOnDelete();
            $table->decimal('harga', 12, 2)->default(0);
            $table->timestamps();
            $table->unique(['kelas_id', 'paket_id']);
        });

        DB::table('pakets')->whereNotNull('kelas_id')->get()->each(function ($paket) {
            DB::table('harga_pakets')->insert([
                'kelas_id' => $paket->kelas_id,
                'paket_id' => $paket->id,
                'harga' => $paket->harga,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });

        Schema::table('pakets', function (Blueprint $table) {
            $table->dropForeign(['kelas_id']);
            $table->dropColumn(['kelas_id', 'harga']);
        });
    }
};
