<?php

namespace Tests\Feature\Console;

use App\Models\Kela;
use App\Models\Pertemuan;
use App\Models\Tutor;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BackfillTarifPertemuanTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolePermissionSeeder::class);
        $this->seed(AdminUserSeeder::class);
    }

    public function test_backfill_mengisi_tarif_pertemuan_lama_dari_tarif_kelas_saat_ini()
    {
        $tutor = Tutor::create(['nip' => 'T001', 'nama' => 'Tutor Satu', 'bidang_ajar' => 'Matematika']);
        $kela = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 150000, 'status' => 'aktif']);

        $pertemuanLama = Pertemuan::create([
            'kelas_id' => $kela->id, 'tutor_id' => $tutor->id, 'pertemuan_ke' => 1,
            'tgl' => now()->subMonth()->toDateString(), 'status' => 'selesai', 'tarif_per_pertemuan' => 0,
        ]);

        $this->artisan('gaji:backfill-tarif-pertemuan')->assertExitCode(0);

        $this->assertEquals(150000, $pertemuanLama->fresh()->tarif_per_pertemuan);
    }

    public function test_backfill_melewati_kelas_yang_tarifnya_masih_nol()
    {
        $tutor = Tutor::create(['nip' => 'T001', 'nama' => 'Tutor Satu', 'bidang_ajar' => 'Matematika']);
        $kela = Kela::create(['nama' => 'Kelas Belum Diisi', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'status' => 'aktif']);

        $pertemuan = Pertemuan::create([
            'kelas_id' => $kela->id, 'tutor_id' => $tutor->id, 'pertemuan_ke' => 1,
            'tgl' => now()->subMonth()->toDateString(), 'status' => 'selesai', 'tarif_per_pertemuan' => 0,
        ]);

        $this->artisan('gaji:backfill-tarif-pertemuan')
            ->expectsConfirmation('Lanjutkan backfill untuk kelas yang sudah punya tarif?', 'yes')
            ->assertExitCode(0);

        $this->assertEquals(0, $pertemuan->fresh()->tarif_per_pertemuan);
    }
}
