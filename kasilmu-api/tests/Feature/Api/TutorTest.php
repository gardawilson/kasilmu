<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TutorTest extends TestCase
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

    public function test_create_tutor()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/tutor', [
            'nama' => 'Tutor Test',
            'username' => 'tutortest',
            'email' => 'tutortest@kasilmu.com',
            'bidang_ajar' => 'Matematika',
            'tarif_per_pertemuan' => 50000,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.nama', 'Tutor Test');
        $this->assertMatchesRegularExpression('/^\d{8}$/', $response->json('data.nip'));
        $this->assertDatabaseHas('users', ['email' => 'tutortest@kasilmu.com', 'username' => 'tutortest']);

        $user = User::where('email', 'tutortest@kasilmu.com')->first();
        $this->assertTrue($user->hasRole('tutor'));
        $this->assertEquals($user->id, $response->json('data.user_id'));
    }

    public function test_tutor_validation()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/tutor', []);

        $response->assertStatus(422);
    }

    public function test_index_tutor()
    {
        $this->actingAs($this->auth())->postJson('/api/tutor', [
            'nama' => 'Tutor A', 'username' => 'tutora', 'email' => 'tutora@kasilmu.com',
            'bidang_ajar' => 'Fisika', 'tarif_per_pertemuan' => 60000,
        ]);

        $response = $this->actingAs($this->auth())->getJson('/api/tutor');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_update_tutor()
    {
        $this->actingAs($this->auth())->postJson('/api/tutor', [
            'nama' => 'Old Name', 'username' => 'oldname', 'email' => 'oldname@kasilmu.com',
            'bidang_ajar' => 'Fisika', 'tarif_per_pertemuan' => 60000,
        ]);

        $response = $this->actingAs($this->auth())->putJson('/api/tutor/1', [
            'nama' => 'New Name', 'username' => 'oldname', 'email' => 'oldname@kasilmu.com',
            'bidang_ajar' => 'Fisika', 'tarif_per_pertemuan' => 60000,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'New Name');
        $this->assertDatabaseHas('users', ['email' => 'oldname@kasilmu.com', 'name' => 'New Name']);
    }

    public function test_delete_tutor()
    {
        $this->actingAs($this->auth())->postJson('/api/tutor', [
            'nama' => 'Test', 'username' => 'testtutor', 'email' => 'test@kasilmu.com',
            'bidang_ajar' => 'Fisika', 'tarif_per_pertemuan' => 60000,
        ]);

        $response = $this->actingAs($this->auth())->deleteJson('/api/tutor/1');

        $response->assertStatus(200);
        $this->assertDatabaseMissing('tutors', ['id' => 1]);
        $this->assertDatabaseMissing('users', ['email' => 'test@kasilmu.com']);
    }
}
