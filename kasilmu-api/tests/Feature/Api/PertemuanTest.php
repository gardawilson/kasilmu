<?php

namespace Tests\Feature\Api;

use App\Models\Kela;
use App\Models\Siswa;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PertemuanTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RolePermissionSeeder::class);
        $this->seed(\Database\Seeders\AdminUserSeeder::class);
    }

    private function admin(): User
    {
        return User::where('email', 'admin@kasilmu.com')->first();
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

    private function siswaDiKelas(Kela $kela): Siswa
    {
        $siswa = Siswa::create([
            'nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01',
            'status' => 'aktif', 'jenjang' => 'SD', 'tingkat' => 3,
        ]);
        $kela->siswa()->attach($siswa->id, ['tgl_masuk' => now()->toDateString(), 'status' => 'aktif']);

        return $siswa;
    }

    public function test_mulai_membuat_pertemuan_dan_presensi_default_hadir()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $siswa = $this->siswaDiKelas($kela);

        $response = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);

        $response->assertStatus(200)
            ->assertJsonPath('data.pertemuan_ke', 1)
            ->assertJsonPath('data.presensis.0.siswa_id', $siswa->id)
            ->assertJsonPath('data.presensis.0.status', 'hadir');
    }

    public function test_mulai_idempotent_untuk_hari_yang_sama()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $this->siswaDiKelas($kela);

        $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);
        $response = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);

        $response->assertStatus(200)->assertJsonPath('data.pertemuan_ke', 1);
        $this->assertDatabaseCount('pertemuans', 1);
    }

    public function test_tutor_lain_bisa_mulai_kelas_yang_bukan_miliknya_dan_tercatat_sebagai_pengajar()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);

        $tutorLain = User::create(['name' => 'Tutor Lain', 'email' => 'lain@kasilmu.com', 'password' => bcrypt('password'), 'is_active' => true]);
        $tutorLain->assignRole('tutor');
        $penggantiId = Tutor::create(['user_id' => $tutorLain->id, 'nip' => 'T002', 'nama' => 'Tutor Lain', 'bidang_ajar' => 'Matematika'])->id;

        $response = $this->actingAs($tutorLain)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);

        $response->assertStatus(200)->assertJsonPath('data.tutor_id', $penggantiId);
    }

    public function test_tutor_lain_tidak_bisa_mengisi_presensi_pertemuan_yang_ditugaskan_ke_tutor_lain()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $siswa = $this->siswaDiKelas($kela);

        $mulai = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);
        $pertemuanId = $mulai->json('data.id');

        $tutorLain = User::create(['name' => 'Tutor Lain', 'email' => 'lain@kasilmu.com', 'password' => bcrypt('password'), 'is_active' => true]);
        $tutorLain->assignRole('tutor');
        Tutor::create(['user_id' => $tutorLain->id, 'nip' => 'T002', 'nama' => 'Tutor Lain', 'bidang_ajar' => 'Matematika']);

        $response = $this->actingAs($tutorLain)->postJson("/api/pertemuan/{$pertemuanId}/presensi", [
            'presensi' => [
                ['siswa_id' => $siswa->id, 'status' => 'hadir'],
            ],
        ]);

        $response->assertStatus(403);
    }

    public function test_admin_bisa_mulai_kelas_manapun()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $this->siswaDiKelas($kela);

        $response = $this->actingAs($this->admin())->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);

        $response->assertStatus(200);
    }

    public function test_storepresensi_menyimpan_catatan_performa_per_siswa()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $siswa = $this->siswaDiKelas($kela);

        $mulai = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);
        $pertemuanId = $mulai->json('data.id');

        $response = $this->actingAs($tutorUser)->postJson("/api/pertemuan/{$pertemuanId}/presensi", [
            'presensi' => [
                ['siswa_id' => $siswa->id, 'status' => 'hadir', 'catatan' => 'Sudah paham perkalian, perlu latihan soal cerita'],
            ],
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('presensis', [
            'pertemuan_id' => $pertemuanId,
            'siswa_id'     => $siswa->id,
            'catatan'      => 'Sudah paham perkalian, perlu latihan soal cerita',
        ]);
    }

    public function test_jadwal_hari_ini_scoped_ke_tutor()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);

        $hariIni = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][now()->dayOfWeek];
        $kela->jadwals()->create(['hari' => $hariIni, 'jam_mulai' => '10:00', 'jam_selesai' => '11:00']);

        $tutorLain = User::create(['name' => 'Tutor Lain', 'email' => 'lain@kasilmu.com', 'password' => bcrypt('password'), 'is_active' => true]);
        $tutorLain->assignRole('tutor');

        $response = $this->actingAs($tutorLain)->getJson('/api/jadwal/hari-ini');
        $response->assertStatus(200)->assertJsonPath('data', []);

        $response = $this->actingAs($tutorUser)->getJson('/api/jadwal/hari-ini');
        $response->assertStatus(200);
        $this->assertCount(1, $response->json('data'));
    }
}
