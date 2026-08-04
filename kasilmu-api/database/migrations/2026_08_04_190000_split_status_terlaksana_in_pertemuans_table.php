<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pertemuans', function (Blueprint $table) {
            $table->string('status')->change();
        });

        // Sesi lama sudah dianggap tuntas — tidak ada sinyal lain untuk membedakan
        // mana yang sebenarnya masih berlangsung saat data ini direkam.
        DB::table('pertemuans')->where('status', 'terlaksana')->update(['status' => 'selesai']);

        Schema::table('pertemuans', function (Blueprint $table) {
            $table->enum('status', ['berlangsung', 'selesai', 'libur'])->default('berlangsung')->change();
        });
    }

    public function down(): void
    {
        Schema::table('pertemuans', function (Blueprint $table) {
            $table->string('status')->change();
        });

        DB::table('pertemuans')->whereIn('status', ['selesai', 'berlangsung'])->update(['status' => 'terlaksana']);

        Schema::table('pertemuans', function (Blueprint $table) {
            $table->enum('status', ['terlaksana', 'libur'])->default('terlaksana')->change();
        });
    }
};
