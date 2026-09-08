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
            $table->date('tgl_daftar')->nullable()->after('nis');
        });

        // Backfill data lama. Acuan utama: tanggal presensi paling awal — itulah
        // pertama kali siswa benar-benar ikut pertemuan. Kalau siswa belum pernah
        // dipresensi, mundur ke tgl_masuk kelas paling awal, lalu terakhir ke
        // tanggal pembuatan record. Setelah ini tgl_daftar tidak pernah diubah.
        $firstPresensi = DB::table('presensis')
            ->join('pertemuans', 'presensis.pertemuan_id', '=', 'pertemuans.id')
            ->select('presensis.siswa_id', DB::raw('MIN(pertemuans.tgl) as tgl'))
            ->groupBy('presensis.siswa_id')
            ->pluck('tgl', 'siswa_id');

        $firstKelas = DB::table('kelas_siswa')
            ->select('siswa_id', DB::raw('MIN(tgl_masuk) as tgl'))
            ->groupBy('siswa_id')
            ->pluck('tgl', 'siswa_id');

        DB::table('siswas')->orderBy('id')->each(function ($siswa) use ($firstPresensi, $firstKelas) {
            DB::table('siswas')->where('id', $siswa->id)->update([
                'tgl_daftar' => $firstPresensi[$siswa->id]
                    ?? $firstKelas[$siswa->id]
                    ?? substr((string) $siswa->created_at, 0, 10),
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('siswas', function (Blueprint $table) {
            $table->dropColumn('tgl_daftar');
        });
    }
};
