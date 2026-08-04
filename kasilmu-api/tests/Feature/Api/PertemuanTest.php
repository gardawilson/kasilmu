<?php

namespace Tests\Feature\Api;

use App\Models\HargaPaket;
use App\Models\Kela;
use App\Models\Paket;
use App\Models\Siswa;
use App\Models\SiswaPaket;
use App\Models\Tutor;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PertemuanTest extends TestCase
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

    private function tutorUser(): User
    {
        return User::where('email', 'tutor@kasilmu.com')->first();
    }

    private function kelaWithTutor(User $tutorUser): Kela
    {
        $tutor = Tutor::create(['user_id' => $tutorUser->id, 'nip' => 'T001', 'nama' => 'Tutor Satu', 'bidang_ajar' => 'Matematika']);

        return Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'status' => 'aktif']);
    }

    private function siswaDiKelas(Kela $kela): Siswa
    {
        $siswa = Siswa::create([
            'nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01',
            'status' => 'aktif', 'tingkat_id' => $this->tingkatId(),
        ]);
        $kela->siswa()->attach($siswa->id, ['tgl_masuk' => now()->toDateString(), 'status' => 'aktif']);

        $paket = Paket::create(['nama' => 'Paket Test', 'jumlah_pertemuan' => 8]);
        HargaPaket::create(['kelas_id' => $kela->id, 'paket_id' => $paket->id, 'harga' => 500000]);
        SiswaPaket::create([
            'siswa_id' => $siswa->id, 'kelas_id' => $kela->id, 'paket_id' => $paket->id,
            'tgl_mulai' => now()->toDateString(), 'tgl_selesai' => now()->addMonth()->toDateString(),
            'status' => 'aktif',
        ]);

        return $siswa;
    }

    public function test_mulai_ditolak_jika_sesi_sudah_dimulai_tutor_lain()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $this->siswaDiKelas($kela);

        $tutorLain = User::create(['name' => 'Tutor Lain', 'email' => 'lain2@kasilmu.com', 'username' => 'lain2', 'password' => bcrypt('password'), 'is_active' => true]);
        $tutorLain->assignRole('tutor');
        Tutor::create(['user_id' => $tutorLain->id, 'nip' => 'T002', 'nama' => 'Tutor Lain', 'bidang_ajar' => 'Matematika']);

        $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id])->assertStatus(200);

        $response = $this->actingAs($tutorLain)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);

        $response->assertStatus(422);
        $this->assertStringContainsString('Tutor Satu', $response->json('message'));
    }

    public function test_mulai_idempoten_untuk_tutor_yang_sama()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $this->siswaDiKelas($kela);

        $first = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);
        $second = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);

        $second->assertStatus(200);
        $this->assertEquals($first->json('data.id'), $second->json('data.id'));
    }

    public function test_mulai_ditolak_jika_ada_siswa_belum_punya_paket()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);

        $siswa = Siswa::create([
            'nis' => '20260002', 'nama' => 'Siswa Tanpa Paket', 'tgl_lahir' => '2010-01-01',
            'status' => 'aktif', 'tingkat_id' => $this->tingkatId(),
        ]);
        $kela->siswa()->attach($siswa->id, ['tgl_masuk' => now()->toDateString(), 'status' => 'aktif']);

        $response = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('pertemuans', ['kelas_id' => $kela->id]);
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
            'siswa_id' => $siswa->id,
            'catatan' => 'Sudah paham perkalian, perlu latihan soal cerita',
        ]);
    }

    public function test_mulai_membuat_pertemuan_berstatus_berlangsung()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $this->siswaDiKelas($kela);

        $response = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);

        $response->assertStatus(200)->assertJsonPath('data.status', 'berlangsung');
    }

    public function test_tutor_bisa_menandai_pertemuan_selesai()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $this->siswaDiKelas($kela);

        $mulai = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);
        $pertemuanId = $mulai->json('data.id');

        $response = $this->actingAs($tutorUser)->postJson("/api/pertemuan/{$pertemuanId}/selesai");

        $response->assertStatus(200)->assertJsonPath('data.status', 'selesai');
    }

    public function test_pertemuan_yang_sudah_selesai_tidak_bisa_ditandai_selesai_lagi()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);
        $this->siswaDiKelas($kela);

        $mulai = $this->actingAs($tutorUser)->postJson('/api/pertemuan/mulai', ['kelas_id' => $kela->id]);
        $pertemuanId = $mulai->json('data.id');
        $this->actingAs($tutorUser)->postJson("/api/pertemuan/{$pertemuanId}/selesai");

        $response = $this->actingAs($tutorUser)->postJson("/api/pertemuan/{$pertemuanId}/selesai");

        $response->assertStatus(422);
    }

    public function test_pertemuan_ke_dihitung_otomatis_saat_tambah_manual_bukan_dari_input()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);

        $pertama = $this->actingAs($this->admin())->postJson('/api/pertemuan', [
            'kelas_id' => $kela->id, 'pertemuan_ke' => 99, 'tgl' => now()->toDateString(), 'status' => 'selesai',
        ]);
        $kedua = $this->actingAs($this->admin())->postJson('/api/pertemuan', [
            'kelas_id' => $kela->id, 'tgl' => now()->addDay()->toDateString(), 'status' => 'selesai',
        ]);

        // pertemuan_ke yang dikirim client (99) diabaikan — tetap dihitung otomatis dari urutan
        $pertama->assertStatus(201)->assertJsonPath('data.pertemuan_ke', 1);
        $kedua->assertStatus(201)->assertJsonPath('data.pertemuan_ke', 2);
    }

    public function test_edit_pertemuan_tidak_mengubah_pertemuan_ke_kalau_kelas_tidak_berubah()
    {
        $tutorUser = $this->tutorUser();
        $kela = $this->kelaWithTutor($tutorUser);

        $created = $this->actingAs($this->admin())->postJson('/api/pertemuan', [
            'kelas_id' => $kela->id, 'tgl' => now()->toDateString(), 'status' => 'selesai',
        ]);

        $response = $this->actingAs($this->admin())->putJson("/api/pertemuan/{$created->json('data.id')}", [
            'kelas_id' => $kela->id, 'tgl' => now()->toDateString(), 'materi' => 'Update', 'status' => 'selesai',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.materi', 'Update')
            ->assertJsonPath('data.pertemuan_ke', $created->json('data.pertemuan_ke'));
    }

    public function test_edit_pertemuan_menghitung_ulang_pertemuan_ke_kalau_pindah_kelas()
    {
        $tutorUser = $this->tutorUser();
        $kelaAsal = $this->kelaWithTutor($tutorUser);
        $kelaTujuan = Kela::create(['nama' => 'Kelas Tujuan', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'status' => 'aktif']);

        // Kelas tujuan sudah punya 1 pertemuan, jadi pertemuan yang dipindah harusnya jadi nomor 2
        $this->actingAs($this->admin())->postJson('/api/pertemuan', [
            'kelas_id' => $kelaTujuan->id, 'tgl' => now()->toDateString(), 'status' => 'selesai',
        ]);

        $created = $this->actingAs($this->admin())->postJson('/api/pertemuan', [
            'kelas_id' => $kelaAsal->id, 'tgl' => now()->toDateString(), 'status' => 'selesai',
        ]);

        $response = $this->actingAs($this->admin())->putJson("/api/pertemuan/{$created->json('data.id')}", [
            'kelas_id' => $kelaTujuan->id, 'tgl' => now()->toDateString(), 'status' => 'selesai',
        ]);

        $response->assertStatus(200)->assertJsonPath('data.pertemuan_ke', 2);
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
