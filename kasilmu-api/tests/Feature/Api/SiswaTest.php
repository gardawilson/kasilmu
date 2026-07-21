<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiswaTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $this->seed(\Database\Seeders\AdminUserSeeder::class);
    }

    private function auth(): User
    {
        return User::where('email', 'admin@kasilmu.com')->first();
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
        $response = $this->actingAs($this->auth())->postJson('/api/siswa', [
            'nis'       => '12345',
            'nama'      => 'Siswa Test',
            'tgl_lahir' => '2010-01-01',
            'status'    => 'aktif',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.nis', '12345')
            ->assertJsonPath('data.nama', 'Siswa Test');
    }

    public function test_create_siswa_validation()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/siswa', []);

        $response->assertStatus(422);
    }

    public function test_show_siswa()
    {
        $this->actingAs($this->auth())->postJson('/api/siswa', [
            'nis' => '12345', 'nama' => 'Test', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif',
        ]);

        $response = $this->actingAs($this->auth())->getJson('/api/siswa/1');

        $response->assertStatus(200)
            ->assertJsonPath('data.nis', '12345');
    }

    public function test_update_siswa()
    {
        $this->actingAs($this->auth())->postJson('/api/siswa', [
            'nis' => '12345', 'nama' => 'Test', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif',
        ]);

        $response = $this->actingAs($this->auth())->putJson('/api/siswa/1', [
            'nis' => '12345', 'nama' => 'Updated Name', 'tgl_lahir' => '2010-01-01',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'Updated Name');
    }

    public function test_delete_siswa()
    {
        $this->actingAs($this->auth())->postJson('/api/siswa', [
            'nis' => '12345', 'nama' => 'Test', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif',
        ]);

        $response = $this->actingAs($this->auth())->deleteJson('/api/siswa/1');

        $response->assertStatus(200);
        $this->assertDatabaseMissing('siswas', ['id' => 1]);
    }
}
