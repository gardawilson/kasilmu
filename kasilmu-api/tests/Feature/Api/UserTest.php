<?php

namespace Tests\Feature\Api;

use App\Models\Tutor;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
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

    public function test_create_akun_siswa()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/user', [
            'name' => 'Ortu Test', 'username' => 'ortutest', 'email' => 'ortu@kasilmu.com',
            'password' => 'password', 'role' => 'orang_tua',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', 'Ortu Test');

        $user = User::where('email', 'ortu@kasilmu.com')->first();
        $this->assertTrue($user->hasRole('orang_tua'));
    }

    public function test_create_akun_validation()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/user', []);

        $response->assertStatus(422);
    }

    public function test_create_akun_tidak_boleh_role_tutor()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/user', [
            'name' => 'Test', 'username' => 'testrole', 'email' => 'test@kasilmu.com',
            'password' => 'password', 'role' => 'tutor',
        ]);

        $response->assertStatus(422);
    }

    public function test_index_akun()
    {
        $response = $this->actingAs($this->auth())->getJson('/api/user');

        $response->assertStatus(200);
        $this->assertGreaterThanOrEqual(3, count($response->json('data')));
    }

    public function test_update_akun()
    {
        $this->actingAs($this->auth())->postJson('/api/user', [
            'name' => 'Old Name', 'username' => 'oldnameuser', 'email' => 'oldname@kasilmu.com',
            'password' => 'password', 'role' => 'siswa',
        ]);
        $user = User::where('email', 'oldname@kasilmu.com')->first();

        $response = $this->actingAs($this->auth())->putJson('/api/user/'.$user->id, [
            'name' => 'New Name', 'username' => 'oldnameuser', 'email' => 'oldname@kasilmu.com',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'New Name');
    }

    public function test_delete_akun()
    {
        $this->actingAs($this->auth())->postJson('/api/user', [
            'name' => 'Test', 'username' => 'testdelete', 'email' => 'test@kasilmu.com',
            'password' => 'password', 'role' => 'siswa',
        ]);
        $user = User::where('email', 'test@kasilmu.com')->first();

        $response = $this->actingAs($this->auth())->deleteJson('/api/user/'.$user->id);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_tidak_bisa_hapus_akun_sendiri()
    {
        $admin = $this->auth();

        $response = $this->actingAs($admin)->deleteJson('/api/user/'.$admin->id);

        $response->assertStatus(422);
        $this->assertDatabaseHas('users', ['id' => $admin->id]);
    }

    public function test_akun_tutor_tidak_bisa_dikelola_dari_sini()
    {
        $tutorUser = User::create(['name' => 'Tutor X', 'email' => 'tutorx@kasilmu.com', 'password' => bcrypt('password'), 'is_active' => true]);
        $tutorUser->assignRole('tutor');
        Tutor::create(['user_id' => $tutorUser->id, 'nip' => 'T999', 'nama' => 'Tutor X', 'bidang_ajar' => 'Fisika']);

        $update = $this->actingAs($this->auth())->putJson('/api/user/'.$tutorUser->id, ['name' => 'Renamed', 'username' => 'renamed', 'email' => 'tutorx@kasilmu.com']);
        $update->assertStatus(422);

        $delete = $this->actingAs($this->auth())->deleteJson('/api/user/'.$tutorUser->id);
        $delete->assertStatus(422);
    }
}
