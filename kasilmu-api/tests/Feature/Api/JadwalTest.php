<?php

namespace Tests\Feature\Api;

use App\Models\Kela;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JadwalTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $this->seed(\Database\Seeders\AdminUserSeeder::class);
    }

    private function tutorUser(): User
    {
        return User::where('email', 'tutor@kasilmu.com')->first();
    }

    private function kelaWithTutor(User $tutorUser): Kela
    {
        $tutor = Tutor::create(['user_id' => $tutorUser->id, 'nip' => 'T001', 'nama' => 'Tutor Satu', 'bidang_ajar' => 'Matematika']);

        return Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'tutor_id' => $tutor->id, 'kapasitas' => 10, 'status' => 'aktif']);
    }

    public function test_tutor_bisa_tambah_jadwal_kelas_sendiri()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);

        $response = $this->actingAs($tutorUser)->postJson('/api/jadwal', [
            'kelas_id' => $kela->id, 'hari' => 'Senin', 'jam_mulai' => '10:00', 'jam_selesai' => '11:00',
        ]);

        $response->assertStatus(201)->assertJsonPath('data.hari', 'Senin');
    }

    public function test_tutor_tidak_bisa_tambah_jadwal_kelas_orang_lain()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);

        $tutorLain = User::create(['name' => 'Tutor Lain', 'email' => 'lain@kasilmu.com', 'password' => bcrypt('password'), 'is_active' => true]);
        $tutorLain->assignRole('tutor');

        $response = $this->actingAs($tutorLain)->postJson('/api/jadwal', [
            'kelas_id' => $kela->id, 'hari' => 'Senin', 'jam_mulai' => '10:00', 'jam_selesai' => '11:00',
        ]);

        $response->assertStatus(403);
    }

    public function test_siswa_tidak_bisa_tambah_jadwal()
    {
        $siswaUser = User::where('email', 'siswa@kasilmu.com')->first();
        $kela = $this->kelaWithTutor($this->tutorUser());

        $response = $this->actingAs($siswaUser)->postJson('/api/jadwal', [
            'kelas_id' => $kela->id, 'hari' => 'Senin', 'jam_mulai' => '10:00', 'jam_selesai' => '11:00',
        ]);

        $response->assertStatus(403);
    }
}
