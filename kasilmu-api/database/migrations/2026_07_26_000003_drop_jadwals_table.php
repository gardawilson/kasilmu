<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('jadwals');
    }

    public function down(): void
    {
        Schema::create('jadwals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained()->onDelete('cascade');
            $table->enum('hari', ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']);
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->string('ruang', 50)->nullable();
            $table->timestamps();
        });
    }
};
