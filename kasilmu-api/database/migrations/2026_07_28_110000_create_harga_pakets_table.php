<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('harga_pakets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->foreignId('paket_id')->constrained('pakets')->cascadeOnDelete();
            $table->decimal('harga', 12, 2)->default(0);
            $table->timestamps();

            $table->unique(['kelas_id', 'paket_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('harga_pakets');
    }
};
