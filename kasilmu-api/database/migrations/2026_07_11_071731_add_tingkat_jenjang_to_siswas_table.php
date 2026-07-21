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
            $table->unsignedTinyInteger('tingkat')->nullable()->after('kelas_asal');
            $table->enum('jenjang', ['SD', 'SMP', 'SMA'])->nullable()->after('tingkat');
        });

        foreach (DB::table('siswas')->select('id', 'kelas_asal')->get() as $siswa) {
            if (! $siswa->kelas_asal || ! preg_match('/\d+/', $siswa->kelas_asal, $matches)) {
                continue;
            }

            $tingkat = (int) $matches[0];

            if ($tingkat < 1 || $tingkat > 12) {
                continue;
            }

            $jenjang = match (true) {
                $tingkat <= 6 => 'SD',
                $tingkat <= 9 => 'SMP',
                default => 'SMA',
            };

            DB::table('siswas')->where('id', $siswa->id)->update([
                'tingkat' => $tingkat,
                'jenjang' => $jenjang,
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('siswas', function (Blueprint $table) {
            $table->dropColumn(['tingkat', 'jenjang']);
        });
    }
};
