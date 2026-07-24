<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('presensis', function (Blueprint $table) {
            $table->string('status')->change();
        });

        DB::table('presensis')->whereIn('status', ['izin', 'sakit', 'alpha'])->update(['status' => 'tidak_hadir']);

        Schema::table('presensis', function (Blueprint $table) {
            $table->enum('status', ['hadir', 'tidak_hadir'])->change();
        });
    }

    public function down(): void
    {
        Schema::table('presensis', function (Blueprint $table) {
            $table->string('status')->change();
        });

        DB::table('presensis')->where('status', 'tidak_hadir')->update(['status' => 'alpha']);

        Schema::table('presensis', function (Blueprint $table) {
            $table->enum('status', ['hadir', 'izin', 'sakit', 'alpha'])->change();
        });
    }
};
