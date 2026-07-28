<?php

namespace Tests\Feature\Api;

use App\Models\HargaPaket;
use App\Models\Kela;
use App\Models\Paket;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiswaTest extends TestCase
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

    private function kela(): Kela
    {
        return Kela::create([
            'nama' => 'Kelas Test', 'mata_pelajaran' => 'Matematika',
            'kapasitas' => 10, 'status' => 'aktif',
        ]);
    }

    private function siswaPayload(int $kelasId): array
    {
        $paket = Paket::create(['nama' => 'Paket Test', 'jumlah_pertemuan' => 8]);

        HargaPaket::create(['kelas_id' => $kelasId, 'paket_id' => $paket->id, 'harga' => 500000]);

        return [
            'nama' => 'Siswa Test', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif',
            'jenjang' => 'SD', 'tingkat' => 3, 'kelas_id' => $kelasId, 'paket_id' => $paket->id,
        ];
    }

    public function test_index_unauthenticated()
    {
        $response = $this->getJson('/api/siswa');
        $response->assertStatus(401);
    }

    public function test_index_empty()
    {
        $response = $this->actingAs($this->auth())->getJson('/api/siswa');

        $response->assertStatus(200)
            ->assertJsonPath('data', []);
    }

    public function test_create_siswa()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/siswa', $this->siswaPayload($this->kela()->id));

        $response->assertStatus(201)
            ->assertJsonPath('data.nama', 'Siswa Test');
        $this->assertMatchesRegularExpression('/^\d{8}$/', $response->json('data.nis'));
    }

    public function test_create_siswa_validation()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/siswa', []);

        $response->assertStatus(422);
    }

    public function test_show_siswa()
    {
        $create = $this->actingAs($this->auth())->postJson('/api/siswa', $this->siswaPayload($this->kela()->id));

        $response = $this->actingAs($this->auth())->getJson('/api/siswa/'.$create->json('data.id'));

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'Siswa Test');
    }

    public function test_update_siswa()
    {
        $create = $this->actingAs($this->auth())->postJson('/api/siswa', $this->siswaPayload($this->kela()->id));

        $response = $this->actingAs($this->auth())->putJson('/api/siswa/'.$create->json('data.id'), [
            'nama' => 'Updated Name', 'tgl_lahir' => '2010-01-01', 'jenjang' => 'SD', 'tingkat' => 3,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'Updated Name');
    }

    public function test_delete_siswa()
    {
        $create = $this->actingAs($this->auth())->postJson('/api/siswa', $this->siswaPayload($this->kela()->id));

        $id = $create->json('data.id');
        $response = $this->actingAs($this->auth())->deleteJson('/api/siswa/'.$id);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('siswas', ['id' => $id]);
    }
}
