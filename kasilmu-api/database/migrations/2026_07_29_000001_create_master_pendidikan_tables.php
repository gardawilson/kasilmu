<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jenjangs', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 20)->unique();
            $table->string('nama');
            $table->unsignedSmallInteger('urutan')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('tingkats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jenjang_id')->constrained('jenjangs')->restrictOnDelete();
            $table->string('nama');
            $table->unsignedSmallInteger('urutan')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['jenjang_id', 'nama']);
            $table->unique(['jenjang_id', 'urutan']);
        });

        $now = now();
        $master = [
            ['kode' => 'SD', 'nama' => 'Sekolah Dasar', 'urutan' => 1, 'tingkats' => range(1, 6)],
            ['kode' => 'SMP', 'nama' => 'Sekolah Menengah Pertama', 'urutan' => 2, 'tingkats' => range(7, 9)],
            ['kode' => 'SMA', 'nama' => 'Sekolah Menengah Atas', 'urutan' => 3, 'tingkats' => range(10, 12)],
        ];

        foreach ($master as $item) {
            $jenjangId = DB::table('jenjangs')->insertGetId([
                'kode' => $item['kode'],
                'nama' => $item['nama'],
                'urutan' => $item['urutan'],
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            foreach ($item['tingkats'] as $urutan) {
                DB::table('tingkats')->insert([
                    'jenjang_id' => $jenjangId,
                    'nama' => 'Tingkat '.$urutan,
                    'urutan' => $urutan,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }

        Schema::table('siswas', function (Blueprint $table) {
            $table->foreignId('tingkat_id')
                ->nullable()
                ->after('kelas_asal')
                ->constrained('tingkats')
                ->restrictOnDelete();
        });

        $siswas = DB::table('siswas')
            ->select('id', 'jenjang', 'tingkat')
            ->whereNotNull('jenjang')
            ->whereNotNull('tingkat')
            ->get();

        foreach ($siswas as $siswa) {
            $tingkatId = DB::table('tingkats')
                ->join('jenjangs', 'tingkats.jenjang_id', '=', 'jenjangs.id')
                ->where('jenjangs.kode', $siswa->jenjang)
                ->where('tingkats.urutan', $siswa->tingkat)
                ->value('tingkats.id');

            if ($tingkatId) {
                DB::table('siswas')->where('id', $siswa->id)->update(['tingkat_id' => $tingkatId]);
            }
        }

        Schema::table('siswas', function (Blueprint $table) {
            $table->dropColumn(['tingkat', 'jenjang']);
        });
    }

    public function down(): void
    {
        Schema::table('siswas', function (Blueprint $table) {
            $table->unsignedTinyInteger('tingkat')->nullable()->after('kelas_asal');
            $table->string('jenjang', 20)->nullable()->after('tingkat');
        });

        $siswas = DB::table('siswas')
            ->join('tingkats', 'siswas.tingkat_id', '=', 'tingkats.id')
            ->join('jenjangs', 'tingkats.jenjang_id', '=', 'jenjangs.id')
            ->select('siswas.id', 'jenjangs.kode as jenjang', 'tingkats.urutan as tingkat')
            ->get();

        foreach ($siswas as $siswa) {
            DB::table('siswas')->where('id', $siswa->id)->update([
                'jenjang' => $siswa->jenjang,
                'tingkat' => $siswa->tingkat,
            ]);
        }

        Schema::table('siswas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('tingkat_id');
        });

        Schema::dropIfExists('tingkats');
        Schema::dropIfExists('jenjangs');
    }
};
