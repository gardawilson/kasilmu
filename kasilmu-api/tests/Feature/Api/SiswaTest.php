<?php

namespace Tests\Feature\Api;

use App\Models\HargaPaket;
use App\Models\Kela;
use App\Models\Paket;
use App\Models\Siswa;
use App\Models\SiswaPaket;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiswaTest extends TestCase
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

    private function kela(): Kela
    {
        return Kela::create([
            'nama' => 'Kelas Test', 'mata_pelajaran' => 'Matematika',
            'kapasitas' => 10, 'status' => 'aktif',
        ]);
    }

    private function siswaPayload(int $kelasId): array
    {
        $paket = Paket::create(['nama' => 'Paket Test', 'jumlah_pertemuan' => 8]);

        HargaPaket::create(['kelas_id' => $kelasId, 'paket_id' => $paket->id, 'harga' => 500000]);

        return [
            'nama' => 'Siswa Test', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif',
            'jenjang_id' => $this->jenjangId(), 'tingkat_id' => $this->tingkatId(),
            'kelas_id' => $kelasId, 'paket_id' => $paket->id,
            'tgl_mulai_paket' => now()->toDateString(),
        ];
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
        $response = $this->actingAs($this->auth())->postJson('/api/siswa', $this->siswaPayload($this->kela()->id));

        $response->assertStatus(201)
            ->assertJsonPath('data.nama', 'Siswa Test');
        $this->assertMatchesRegularExpression('/^\d{8}$/', $response->json('data.nis'));
    }

    public function test_create_siswa_validation()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/siswa', []);

        $response->assertStatus(422);
    }

    public function test_create_siswa_menggunakan_tanggal_mulai_paket_yang_dipilih()
    {
        $kela = $this->kela();
        $payload = $this->siswaPayload($kela->id);
        $payload['tgl_mulai_paket'] = '2026-07-13';

        $response = $this->actingAs($this->auth())->postJson('/api/siswa', $payload);

        $response->assertCreated();
        $siswaId = $response->json('data.id');

        $siswaPaket = SiswaPaket::where('siswa_id', $siswaId)->firstOrFail();
        $this->assertSame('2026-07-13', $siswaPaket->tgl_mulai->toDateString());
        $this->assertSame('2026-08-13', $siswaPaket->tgl_selesai->toDateString());
        $this->assertDatabaseHas('kelas_siswa', [
            'siswa_id' => $siswaId,
            'kelas_id' => $kela->id,
            'tgl_masuk' => '2026-07-13',
        ]);
        $this->assertDatabaseHas('tagihans', [
            'siswa_id' => $siswaId,
            'tenggat' => '2026-07-13',
        ]);
    }

    public function test_show_siswa()
    {
        $create = $this->actingAs($this->auth())->postJson('/api/siswa', $this->siswaPayload($this->kela()->id));

        $response = $this->actingAs($this->auth())->getJson('/api/siswa/'.$create->json('data.id'));

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'Siswa Test');
    }

    public function test_update_siswa()
    {
        $create = $this->actingAs($this->auth())->postJson('/api/siswa', $this->siswaPayload($this->kela()->id));

        $response = $this->actingAs($this->auth())->putJson('/api/siswa/'.$create->json('data.id'), [
            'nama' => 'Updated Name', 'tgl_lahir' => '2010-01-01',
            'jenjang_id' => $this->jenjangId(), 'tingkat_id' => $this->tingkatId(),
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'Updated Name');
    }

    public function test_filter_belum_berkelas_menyembunyikan_siswa_yang_sudah_di_kelas_atau_punya_paket()
    {
        $kela = $this->kela();
        $this->actingAs($this->auth())->postJson('/api/siswa', $this->siswaPayload($kela->id));

        $siswaTerjadwal = Siswa::create([
            'nis' => '20260099', 'nama' => 'Siswa Terjadwal', 'tgl_lahir' => '2010-01-01',
            'status' => 'aktif', 'tingkat_id' => $this->tingkatId(),
        ]);
        $paket = Paket::create(['nama' => 'Paket Lain', 'jumlah_pertemuan' => 8]);
        SiswaPaket::create([
            'siswa_id' => $siswaTerjadwal->id, 'kelas_id' => $kela->id, 'paket_id' => $paket->id,
            'tgl_mulai' => now()->addMonth()->toDateString(), 'tgl_selesai' => now()->addMonths(2)->toDateString(),
            'status' => 'terjadwal',
        ]);

        $siswaBebas = Siswa::create([
            'nis' => '20260098', 'nama' => 'Siswa Bebas', 'tgl_lahir' => '2010-01-01',
            'status' => 'aktif', 'tingkat_id' => $this->tingkatId(),
        ]);

        $response = $this->actingAs($this->auth())->getJson('/api/siswa?belum_berkelas=1&per_page=50');

        $response->assertStatus(200);
        $namaList = collect($response->json('data'))->pluck('nama');
        $this->assertTrue($namaList->contains('Siswa Bebas'));
        $this->assertFalse($namaList->contains('Siswa Test'));
        $this->assertFalse($namaList->contains('Siswa Terjadwal'));
    }

    public function test_delete_siswa()
    {
        $create = $this->actingAs($this->auth())->postJson('/api/siswa', $this->siswaPayload($this->kela()->id));

        $id = $create->json('data.id');
        $response = $this->actingAs($this->auth())->deleteJson('/api/siswa/'.$id);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('siswas', ['id' => $id]);
    }
}
