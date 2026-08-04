<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pertemuans', function (Blueprint $table) {
            $table->decimal('tarif_per_pertemuan', 12, 2)->default(0)->after('status');
        });

        // Sengaja tidak di-backfill di sini: pada saat migration ini jalan,
        // tarif tiap kelas belum tentu sudah diisi admin (masih default 0).
        // Backfill histori pertemuan dilakukan manual lewat
        // `php artisan gaji:backfill-tarif-pertemuan` setelah semua kelas
        // sudah diisi tarifnya. Lihat App\Console\Commands\BackfillTarifPertemuan.
    }

    public function down(): void
    {
        Schema::table('pertemuans', function (Blueprint $table) {
            $table->dropColumn('tarif_per_pertemuan');
        });
    }
};
