<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('siswa_pakets', function (Blueprint $table) {
            $table->enum('status', ['aktif', 'terjadwal', 'selesai'])
                ->default('aktif')
                ->change();
        });

        Schema::table('tagihans', function (Blueprint $table) {
            $table->foreignId('siswa_paket_id')
                ->nullable()
                ->after('siswa_id')
                ->constrained('siswa_pakets')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        DB::table('siswa_pakets')
            ->where('status', 'terjadwal')
            ->update(['status' => 'selesai']);

        Schema::table('tagihans', function (Blueprint $table) {
            $table->dropConstrainedForeignId('siswa_paket_id');
        });

        Schema::table('siswa_pakets', function (Blueprint $table) {
            $table->enum('status', ['aktif', 'selesai'])
                ->default('aktif')
                ->change();
        });
    }
};
