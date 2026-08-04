<?php

namespace Tests\Feature\Api;

use App\Models\Kela;
use App\Models\Nilai;
use App\Models\Pertemuan;
use App\Models\Siswa;
use App\Models\Tagihan;
use App\Models\Tutor;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TutorScopeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolePermissionSeeder::class);
        $this->seed(AdminUserSeeder::class);
    }

    private function admin(): User
    {
        return User::where('email', 'admin@kasilmu.com')->first();
    }

    private function tutorWithKelas(): array
    {
        $tutorUser = User::create(['name' => 'Tutor Satu', 'username' => 'tutorsatu', 'email' => 'tutorsatu@kasilmu.com', 'password' => bcrypt('password'), 'is_active' => true]);
        $tutorUser->assignRole('tutor');
        $tutor = Tutor::create(['user_id' => $tutorUser->id, 'nip' => 'T001', 'nama' => 'Tutor Satu', 'bidang_ajar' => 'Matematika']);

        $kelaSendiri = Kela::create(['nama' => 'Kelas Sendiri', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'status' => 'aktif']);
        $kelaLain = Kela::create(['nama' => 'Kelas Lain', 'mata_pelajaran' => 'Fisika', 'kapasitas' => 10, 'status' => 'aktif']);

        $siswaSendiri = Siswa::create(['nis' => '20260001', 'nama' => 'Siswa Sendiri', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif', 'tingkat_id' => $this->tingkatId()]);
        $siswaLain = Siswa::create(['nis' => '20260002', 'nama' => 'Siswa Lain', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif', 'tingkat_id' => $this->tingkatId()]);
        $kelaSendiri->siswa()->attach($siswaSendiri->id, ['tgl_masuk' => now()->toDateString(), 'status' => 'aktif']);
        $kelaLain->siswa()->attach($siswaLain->id, ['tgl_masuk' => now()->toDateString(), 'status' => 'aktif']);

        Pertemuan::create(['kelas_id' => $kelaSendiri->id, 'tutor_id' => $tutor->id, 'pertemuan_ke' => 1, 'tgl' => '2026-07-01', 'status' => 'selesai']);
        Pertemuan::create(['kelas_id' => $kelaLain->id, 'tutor_id' => null, 'pertemuan_ke' => 1, 'tgl' => '2026-07-01', 'status' => 'selesai']);

        return compact('tutorUser', 'tutor', 'kelaSendiri', 'kelaLain', 'siswaSendiri', 'siswaLain');
    }

    public function test_tutor_bisa_lihat_kelas_yang_pernah_diajar()
    {
        $ctx = $this->tutorWithKelas();

        $response = $this->actingAs($ctx['tutorUser'])->getJson('/api/kelas/'.$ctx['kelaSendiri']->id);

        $response->assertStatus(200);
    }

    public function test_tutor_tidak_bisa_lihat_kelas_yang_tidak_pernah_diajar()
    {
        $ctx = $this->tutorWithKelas();

        $response = $this->actingAs($ctx['tutorUser'])->getJson('/api/kelas/'.$ctx['kelaLain']->id);

        $response->assertStatus(403);
    }

    public function test_admin_bisa_lihat_semua_kelas()
    {
        $ctx = $this->tutorWithKelas();

        $response = $this->actingAs($this->admin())->getJson('/api/kelas/'.$ctx['kelaLain']->id);

        $response->assertStatus(200);
    }

    public function test_tagihan_index_discope_ke_kelas_yang_diajar_tutor()
    {
        $ctx = $this->tutorWithKelas();
        Tagihan::create(['siswa_id' => $ctx['siswaSendiri']->id, 'jenis' => 'spp', 'jumlah' => 100000, 'status' => 'pending']);
        Tagihan::create(['siswa_id' => $ctx['siswaLain']->id, 'jenis' => 'spp', 'jumlah' => 100000, 'status' => 'pending']);

        $response = $this->actingAs($ctx['tutorUser'])->getJson('/api/tagihan');

        $response->assertStatus(200)->assertJsonCount(1, 'data');
        $this->assertEquals($ctx['siswaSendiri']->id, $response->json('data.0.siswa_id'));
    }

    public function test_nilai_index_discope_ke_kelas_yang_diajar_tutor()
    {
        $ctx = $this->tutorWithKelas();
        Nilai::create(['siswa_id' => $ctx['siswaSendiri']->id, 'kelas_id' => $ctx['kelaSendiri']->id, 'jenis_nilai' => 'tugas', 'nilai' => 90]);
        Nilai::create(['siswa_id' => $ctx['siswaLain']->id, 'kelas_id' => $ctx['kelaLain']->id, 'jenis_nilai' => 'tugas', 'nilai' => 80]);

        $response = $this->actingAs($ctx['tutorUser'])->getJson('/api/nilai');

        $response->assertStatus(200)->assertJsonCount(1, 'data');
    }

    public function test_pertemuan_index_tidak_discope_tutor_bisa_lihat_semua()
    {
        $ctx = $this->tutorWithKelas();

        $response = $this->actingAs($ctx['tutorUser'])->getJson('/api/pertemuan');

        // Menu presensi tidak di-scope: tutor boleh lihat seluruh pertemuan (read-only).
        $response->assertStatus(200)->assertJsonCount(2, 'data');
    }

    public function test_tutor_bisa_lihat_detail_pertemuan_milik_tutor_lain()
    {
        $ctx = $this->tutorWithKelas();
        $pertemuanOrangLain = Pertemuan::where('kelas_id', $ctx['kelaLain']->id)->first();

        $response = $this->actingAs($ctx['tutorUser'])->getJson('/api/pertemuan/'.$pertemuanOrangLain->id);

        $response->assertStatus(200);
    }

    public function test_tutor_tidak_bisa_edit_pertemuan_milik_tutor_lain()
    {
        $ctx = $this->tutorWithKelas();
        $tutorLain = User::create(['name' => 'Tutor Dua', 'username' => 'tutordua', 'email' => 'tutordua@kasilmu.com', 'password' => bcrypt('password'), 'is_active' => true]);
        $tutorLain->assignRole('tutor');
        $tutorLainModel = Tutor::create(['user_id' => $tutorLain->id, 'nip' => 'T002', 'nama' => 'Tutor Dua', 'bidang_ajar' => 'Fisika']);

        $pertemuanTutorLain = Pertemuan::create([
            'kelas_id' => $ctx['kelaSendiri']->id, 'tutor_id' => $tutorLainModel->id,
            'pertemuan_ke' => 2, 'tgl' => '2026-07-02', 'status' => 'selesai',
        ]);

        $response = $this->actingAs($ctx['tutorUser'])->putJson('/api/pertemuan/'.$pertemuanTutorLain->id, [
            'kelas_id' => $ctx['kelaSendiri']->id, 'pertemuan_ke' => 2, 'tgl' => '2026-07-02',
        ]);

        $response->assertStatus(403);
    }

    public function test_tutor_bisa_lihat_semua_siswa_read_only()
    {
        $ctx = $this->tutorWithKelas();

        $response = $this->actingAs($ctx['tutorUser'])->getJson('/api/siswa');

        // Menu siswa tidak di-scope: tutor boleh lihat seluruh siswa, sama seperti admin (read-only).
        $response->assertStatus(200)->assertJsonCount(2, 'data');
    }

    public function test_tutor_bisa_lihat_detail_siswa_di_kelas_manapun()
    {
        $ctx = $this->tutorWithKelas();

        $response = $this->actingAs($ctx['tutorUser'])->getJson('/api/siswa/'.$ctx['siswaLain']->id);

        $response->assertStatus(200);
    }

    public function test_tutor_tidak_bisa_tambah_siswa()
    {
        $ctx = $this->tutorWithKelas();

        $response = $this->actingAs($ctx['tutorUser'])->postJson('/api/siswa', [
            'nama' => 'Siswa Baru', 'tgl_lahir' => '2010-01-01',
            'jenjang_id' => $this->jenjangId(), 'tingkat_id' => $this->tingkatId(),
        ]);

        $response->assertStatus(403);
    }

    public function test_admin_bisa_lihat_semua_siswa()
    {
        $ctx = $this->tutorWithKelas();

        $response = $this->actingAs($this->admin())->getJson('/api/siswa');

        $response->assertStatus(200)->assertJsonCount(2, 'data');
    }

    public function test_admin_bisa_lihat_semua_tagihan()
    {
        $ctx = $this->tutorWithKelas();
        Tagihan::create(['siswa_id' => $ctx['siswaSendiri']->id, 'jenis' => 'spp', 'jumlah' => 100000, 'status' => 'pending']);
        Tagihan::create(['siswa_id' => $ctx['siswaLain']->id, 'jenis' => 'spp', 'jumlah' => 100000, 'status' => 'pending']);

        $response = $this->actingAs($this->admin())->getJson('/api/tagihan');

        $response->assertStatus(200)->assertJsonCount(2, 'data');
    }
}
