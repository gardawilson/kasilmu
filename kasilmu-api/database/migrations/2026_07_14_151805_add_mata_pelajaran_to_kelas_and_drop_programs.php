<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kelas', function (Blueprint $table) {
            $table->string('mata_pelajaran')->nullable()->after('nama');
            $table->text('deskripsi')->nullable()->after('mata_pelajaran');
            $table->integer('durasi_bulan')->nullable()->after('deskripsi');
        });

        foreach (DB::table('kelas')->select('id', 'program_id')->get() as $kelas) {
            $program = DB::table('programs')->where('id', $kelas->program_id)->first();

            if ($program) {
                DB::table('kelas')->where('id', $kelas->id)->update([
                    'mata_pelajaran' => $program->nama,
                    'deskripsi'      => $program->deskripsi,
                    'durasi_bulan'   => $program->durasi_bulan,
                ]);
            }
        }

        Schema::table('kelas', function (Blueprint $table) {
            $table->dropForeign(['program_id']);
            $table->dropColumn('program_id');
        });

        Schema::dropIfExists('programs');
    }

    public function down(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->integer('durasi_bulan');
            $table->timestamps();
        });

        Schema::table('kelas', function (Blueprint $table) {
            $table->foreignId('program_id')->nullable()->after('nama')->constrained('programs')->cascadeOnDelete();
            $table->dropColumn(['mata_pelajaran', 'deskripsi', 'durasi_bulan']);
        });
    }
};
