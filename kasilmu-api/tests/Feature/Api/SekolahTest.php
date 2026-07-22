<?php

namespace Tests\Feature\Api;

use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SekolahTest extends TestCase
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
        $response = $this->getJson('/api/sekolah');
        $response->assertStatus(401);
    }

    public function test_create_sekolah()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/sekolah', ['nama' => 'SDN 01']);

        $response->assertStatus(201)
            ->assertJsonPath('data.nama', 'SDN 01');
    }

    public function test_create_sekolah_duplicate_rejected()
    {
        Sekolah::create(['nama' => 'SDN 01']);

        $response = $this->actingAs($this->auth())->postJson('/api/sekolah', ['nama' => 'SDN 01']);

        $response->assertStatus(422);
    }

    public function test_update_sekolah()
    {
        $sekolah = Sekolah::create(['nama' => 'SDN 01']);

        $response = $this->actingAs($this->auth())->putJson("/api/sekolah/{$sekolah->id}", ['nama' => 'SDN 02']);

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'SDN 02');
    }

    public function test_delete_sekolah()
    {
        $sekolah = Sekolah::create(['nama' => 'SDN 01']);

        $response = $this->actingAs($this->auth())->deleteJson("/api/sekolah/{$sekolah->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('sekolahs', ['id' => $sekolah->id]);
    }
}
