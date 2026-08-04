<?php

namespace Tests\Feature\Api;

use App\Models\Kela;
use App\Models\Siswa;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KelasTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolePermissionSeeder::class);
        $this->seed(AdminUserSeeder::class);
    }

    private function auth(): User
    {
        return User::where('email', 'admin@kasilmu.com')->first();
    }

    public function test_siswa_tidak_bisa_aktif_di_dua_kelas_sekaligus()
    {
        $kelaA = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $kelaB = Kela::create(['nama' => 'Kelas B', 'mata_pelajaran' => 'Fisika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $siswa = Siswa::create(['nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif', 'tingkat_id' => $this->tingkatId()]);

        $this->actingAs($this->auth())->postJson("/api/kelas/{$kelaA->id}/siswa", ['siswa_id' => $siswa->id])
            ->assertStatus(200);

        $response = $this->actingAs($this->auth())->postJson("/api/kelas/{$kelaB->id}/siswa", ['siswa_id' => $siswa->id]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('kelas_siswa', ['kelas_id' => $kelaB->id, 'siswa_id' => $siswa->id]);
    }

    public function test_siswa_bisa_pindah_kelas_setelah_dikeluarkan_dari_kelas_lama()
    {
        $kelaA = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $kelaB = Kela::create(['nama' => 'Kelas B', 'mata_pelajaran' => 'Fisika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $siswa = Siswa::create(['nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif', 'tingkat_id' => $this->tingkatId()]);

        $this->actingAs($this->auth())->postJson("/api/kelas/{$kelaA->id}/siswa", ['siswa_id' => $siswa->id]);
        $this->actingAs($this->auth())->deleteJson("/api/kelas/{$kelaA->id}/siswa/{$siswa->id}");

        $response = $this->actingAs($this->auth())->postJson("/api/kelas/{$kelaB->id}/siswa", ['siswa_id' => $siswa->id]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kelas_siswa', ['kelas_id' => $kelaB->id, 'siswa_id' => $siswa->id, 'status' => 'aktif']);
    }
}
