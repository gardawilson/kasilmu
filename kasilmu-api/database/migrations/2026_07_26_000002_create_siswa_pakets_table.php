<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('siswa_pakets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained()->onDelete('cascade');
            $table->foreignId('kelas_id')->constrained('kelas')->onDelete('cascade');
            $table->foreignId('paket_id')->constrained()->onDelete('restrict');
            $table->date('tgl_mulai');
            $table->date('tgl_selesai');
            $table->enum('status', ['aktif', 'selesai'])->default('aktif');
            $table->timestamps();

            $table->unique(['siswa_id', 'kelas_id', 'tgl_mulai']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('siswa_pakets');
    }
};
