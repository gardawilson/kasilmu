<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pertemuans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained()->onDelete('cascade');
            $table->integer('pertemuan_ke');
            $table->date('tgl');
            $table->text('materi')->nullable();
            $table->enum('status', ['terlaksana', 'libur'])->default('terlaksana');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pertemuans');
    }
};
