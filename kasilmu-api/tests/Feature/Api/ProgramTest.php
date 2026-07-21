<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProgramTest extends TestCase
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

    public function test_create_program()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/program', [
            'nama'         => 'Program A',
            'deskripsi'    => 'Test program',
            'durasi_bulan' => 6,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.nama', 'Program A');
    }

    public function test_program_validation()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/program', []);

        $response->assertStatus(422);
    }

    public function test_index_program()
    {
        $this->actingAs($this->auth())->postJson('/api/program', [
            'nama' => 'Prog X', 'durasi_bulan' => 3,
        ]);

        $response = $this->actingAs($this->auth())->getJson('/api/program?per_page=10');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_update_program()
    {
        $this->actingAs($this->auth())->postJson('/api/program', [
            'nama' => 'Old', 'durasi_bulan' => 3,
        ]);

        $response = $this->actingAs($this->auth())->putJson('/api/program/1', [
            'nama' => 'Updated', 'durasi_bulan' => 6,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'Updated');
    }

    public function test_delete_program()
    {
        $this->actingAs($this->auth())->postJson('/api/program', [
            'nama' => 'Test', 'durasi_bulan' => 3,
        ]);

        $response = $this->actingAs($this->auth())->deleteJson('/api/program/1');

        $response->assertStatus(200);
        $this->assertDatabaseMissing('programs', ['id' => 1]);
    }
}
