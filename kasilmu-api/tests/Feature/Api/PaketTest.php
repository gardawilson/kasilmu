<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaketTest extends TestCase
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

    public function test_create_paket()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Paket 12x Pertemuan',
            'jumlah_pertemuan' => 12,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.nama', 'Paket 12x Pertemuan');
    }

    public function test_paket_validation()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/paket', []);

        $response->assertStatus(422);
    }

    public function test_index_paket()
    {
        $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Paket 16x Pertemuan', 'jumlah_pertemuan' => 16,
        ]);

        $response = $this->actingAs($this->auth())->getJson('/api/paket');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_update_paket()
    {
        $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Old Name', 'jumlah_pertemuan' => 12,
        ]);

        $response = $this->actingAs($this->auth())->putJson('/api/paket/1', [
            'nama' => 'New Name', 'jumlah_pertemuan' => 12,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'New Name');
    }

    public function test_delete_paket()
    {
        $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Test', 'jumlah_pertemuan' => 12,
        ]);

        $response = $this->actingAs($this->auth())->deleteJson('/api/paket/1');

        $response->assertStatus(200);
        $this->assertDatabaseMissing('pakets', ['id' => 1]);
    }

    public function test_delete_paket_yang_masih_dipakai_ditolak()
    {
        $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Test', 'jumlah_pertemuan' => 12,
        ]);

        $kela = \App\Models\Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'status' => 'aktif']);
        $siswa = \App\Models\Siswa::create([
            'nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01',
            'tingkat' => 3, 'jenjang' => 'SD', 'status' => 'aktif',
        ]);
        \App\Models\SiswaPaket::create([
            'siswa_id' => $siswa->id, 'kelas_id' => $kela->id, 'paket_id' => 1,
            'tgl_mulai' => now()->toDateString(), 'tgl_selesai' => now()->addMonth()->toDateString(),
            'status' => 'aktif',
        ]);

        $response = $this->actingAs($this->auth())->deleteJson('/api/paket/1');

        $response->assertStatus(422);
        $this->assertDatabaseHas('pakets', ['id' => 1]);
    }
}
