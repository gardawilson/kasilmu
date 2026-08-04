<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->renomorDuplikat();

        Schema::table('pertemuans', function (Blueprint $table) {
            $table->unique(['kelas_id', 'pertemuan_ke']);
        });
    }

    public function down(): void
    {
        Schema::table('pertemuans', function (Blueprint $table) {
            $table->dropUnique(['kelas_id', 'pertemuan_ke']);
        });
    }

    /**
     * Data lama (diinput manual lewat form admin) bisa punya pertemuan_ke duplikat
     * per kelas karena belum ada validasi keunikan. Baris tertua per grup duplikat
     * mempertahankan nomornya, sisanya digeser ke nomor berikutnya yang tersedia.
     */
    private function renomorDuplikat(): void
    {
        $duplicateGroups = DB::table('pertemuans')
            ->select('kelas_id', 'pertemuan_ke')
            ->groupBy('kelas_id', 'pertemuan_ke')
            ->havingRaw('COUNT(*) > 1')
            ->get();

        foreach ($duplicateGroups as $group) {
            $rows = DB::table('pertemuans')
                ->where('kelas_id', $group->kelas_id)
                ->where('pertemuan_ke', $group->pertemuan_ke)
                ->orderBy('id')
                ->get();

            $nextNumber = DB::table('pertemuans')->where('kelas_id', $group->kelas_id)->max('pertemuan_ke') + 1;

            foreach ($rows->slice(1) as $row) {
                DB::table('pertemuans')->where('id', $row->id)->update(['pertemuan_ke' => $nextNumber]);
                $nextNumber++;
            }
        }
    }
};
