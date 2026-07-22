<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('siswas', function (Blueprint $table) {
            $table->foreignId('sekolah_id')->nullable()->after('sekolah')->constrained('sekolahs')->nullOnDelete();
        });

        foreach (DB::table('siswas')->whereNotNull('sekolah')->where('sekolah', '!=', '')->select('id', 'sekolah')->get() as $siswa) {
            $sekolahId = DB::table('sekolahs')->where('nama', $siswa->sekolah)->value('id');

            if (! $sekolahId) {
                $sekolahId = DB::table('sekolahs')->insertGetId([
                    'nama' => $siswa->sekolah,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            DB::table('siswas')->where('id', $siswa->id)->update(['sekolah_id' => $sekolahId]);
        }

        Schema::table('siswas', function (Blueprint $table) {
            $table->dropColumn('sekolah');
        });
    }

    public function down(): void
    {
        Schema::table('siswas', function (Blueprint $table) {
            $table->string('sekolah')->nullable()->after('alamat');
        });

        foreach (DB::table('siswas')->whereNotNull('sekolah_id')->select('id', 'sekolah_id')->get() as $siswa) {
            $nama = DB::table('sekolahs')->where('id', $siswa->sekolah_id)->value('nama');
            DB::table('siswas')->where('id', $siswa->id)->update(['sekolah' => $nama]);
        }

        Schema::table('siswas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('sekolah_id');
        });
    }
};
