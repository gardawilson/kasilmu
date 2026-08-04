<?php

namespace Tests\Feature\Api;

use App\Models\Kela;
use App\Models\Pertemuan;
use App\Models\Tutor;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LaporanGajiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolePermissionSeeder::class);
        $this->seed(AdminUserSeeder::class);
    }

    private function admin(): User
    {
        return User::where('email', 'admin@kasilmu.com')->first();
    }

    public function test_gaji_dihitung_dari_pertemuan_selesai_dikali_tarif_kelas()
    {
        $tutor = Tutor::create(['nip' => 'T001', 'nama' => 'Tutor Satu', 'bidang_ajar' => 'Matematika']);

        $kelaA = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $kelaB = Kela::create(['nama' => 'Kelas B', 'mata_pelajaran' => 'Fisika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 50000, 'status' => 'aktif']);

        Pertemuan::create(['kelas_id' => $kelaA->id, 'tutor_id' => $tutor->id, 'pertemuan_ke' => 1, 'tgl' => now()->toDateString(), 'status' => 'selesai', 'tarif_per_pertemuan' => $kelaA->tarif_per_pertemuan]);
        Pertemuan::create(['kelas_id' => $kelaA->id, 'tutor_id' => $tutor->id, 'pertemuan_ke' => 2, 'tgl' => now()->toDateString(), 'status' => 'selesai', 'tarif_per_pertemuan' => $kelaA->tarif_per_pertemuan]);
        Pertemuan::create(['kelas_id' => $kelaB->id, 'tutor_id' => $tutor->id, 'pertemuan_ke' => 1, 'tgl' => now()->toDateString(), 'status' => 'selesai', 'tarif_per_pertemuan' => $kelaB->tarif_per_pertemuan]);
        // Libur tidak dihitung
        Pertemuan::create(['kelas_id' => $kelaA->id, 'tutor_id' => $tutor->id, 'pertemuan_ke' => 3, 'tgl' => now()->toDateString(), 'status' => 'libur', 'tarif_per_pertemuan' => $kelaA->tarif_per_pertemuan]);
        // Masih berlangsung (belum ditutup) tidak dihitung
        Pertemuan::create(['kelas_id' => $kelaA->id, 'tutor_id' => $tutor->id, 'pertemuan_ke' => 4, 'tgl' => now()->toDateString(), 'status' => 'berlangsung', 'tarif_per_pertemuan' => $kelaA->tarif_per_pertemuan]);

        $response = $this->actingAs($this->admin())->getJson('/api/laporan/gaji');

        $response->assertStatus(200);
        $this->assertEquals(250000, $response->json('data.total_gaji'));

        $detail = collect($response->json('data.detail'))->firstWhere('tutor_id', $tutor->id);
        $this->assertEquals(3, $detail['total_pertemuan']);
        $this->assertEquals(250000, $detail['total_gaji']);
    }

    public function test_gaji_bisa_difilter_per_tutor()
    {
        $tutorA = Tutor::create(['nip' => 'T001', 'nama' => 'Tutor A', 'bidang_ajar' => 'Matematika']);
        $tutorB = Tutor::create(['nip' => 'T002', 'nama' => 'Tutor B', 'bidang_ajar' => 'Fisika']);
        $kela = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);

        Pertemuan::create(['kelas_id' => $kela->id, 'tutor_id' => $tutorA->id, 'pertemuan_ke' => 1, 'tgl' => now()->toDateString(), 'status' => 'selesai', 'tarif_per_pertemuan' => $kela->tarif_per_pertemuan]);
        Pertemuan::create(['kelas_id' => $kela->id, 'tutor_id' => $tutorB->id, 'pertemuan_ke' => 2, 'tgl' => now()->addDay()->toDateString(), 'status' => 'selesai', 'tarif_per_pertemuan' => $kela->tarif_per_pertemuan]);

        $response = $this->actingAs($this->admin())->getJson("/api/laporan/gaji?tutor_id={$tutorA->id}");

        $response->assertStatus(200);
        $this->assertCount(1, $response->json('data.detail'));
        $this->assertEquals($tutorA->id, $response->json('data.detail.0.tutor_id'));
    }

    public function test_tarif_pertemuan_disnapshot_saat_dibuat_dan_tidak_berubah_meski_tarif_kelas_direvisi()
    {
        $tutor = Tutor::create(['nip' => 'T001', 'nama' => 'Tutor Satu', 'bidang_ajar' => 'Matematika']);
        $kela = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);

        $response = $this->actingAs($this->admin())->postJson('/api/pertemuan', [
            'kelas_id' => $kela->id, 'tutor_id' => $tutor->id,
            'pertemuan_ke' => 1, 'tgl' => now()->toDateString(), 'status' => 'selesai',
        ]);

        $response->assertStatus(201);
        $this->assertEquals(100000, $response->json('data.tarif_per_pertemuan'));

        // Tarif kelas direvisi belakangan
        $kela->update(['tarif_per_pertemuan' => 200000]);

        $gaji = $this->actingAs($this->admin())->getJson('/api/laporan/gaji');
        $this->assertEquals(100000, $gaji->json('data.total_gaji'));
    }
}
