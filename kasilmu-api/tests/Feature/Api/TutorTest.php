<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TutorTest extends TestCase
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

    public function test_create_tutor()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/tutor', [
            'nip'                 => 'T001',
            'nama'                => 'Tutor Test',
            'bidang_ajar'         => 'Matematika',
            'tarif_per_pertemuan' => 50000,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.nama', 'Tutor Test');
    }

    public function test_tutor_validation()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/tutor', []);

        $response->assertStatus(422);
    }

    public function test_index_tutor()
    {
        $this->actingAs($this->auth())->postJson('/api/tutor', [
            'nip' => 'T001', 'nama' => 'Tutor A', 'bidang_ajar' => 'Fisika', 'tarif_per_pertemuan' => 60000,
        ]);

        $response = $this->actingAs($this->auth())->getJson('/api/tutor');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_update_tutor()
    {
        $this->actingAs($this->auth())->postJson('/api/tutor', [
            'nip' => 'T001', 'nama' => 'Old Name', 'bidang_ajar' => 'Fisika', 'tarif_per_pertemuan' => 60000,
        ]);

        $response = $this->actingAs($this->auth())->putJson('/api/tutor/1', [
            'nip' => 'T001', 'nama' => 'New Name',
            'bidang_ajar' => 'Fisika', 'tarif_per_pertemuan' => 60000,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'New Name');
    }

    public function test_delete_tutor()
    {
        $this->actingAs($this->auth())->postJson('/api/tutor', [
            'nip' => 'T001', 'nama' => 'Test', 'bidang_ajar' => 'Fisika', 'tarif_per_pertemuan' => 60000,
        ]);

        $response = $this->actingAs($this->auth())->deleteJson('/api/tutor/1');

        $response->assertStatus(200);
        $this->assertDatabaseMissing('tutors', ['id' => 1]);
    }
}
