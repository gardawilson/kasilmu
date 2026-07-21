<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('siswas', function (Blueprint $table) {
            $table->id();
            $table->string('nis', 20)->unique();
            $table->string('nama');
            $table->string('email')->nullable();
            $table->string('no_telp', 20)->nullable();
            $table->date('tgl_lahir');
            $table->text('alamat')->nullable();
            $table->string('sekolah')->nullable();
            $table->string('kelas_asal', 50)->nullable();
            $table->string('nama_ortu')->nullable();
            $table->string('no_telp_ortu', 20)->nullable();
            $table->string('foto')->nullable();
            $table->enum('status', ['aktif', 'nonaktif', 'lulus'])->default('aktif');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('siswas');
    }
};
