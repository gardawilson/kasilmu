<?php

namespace Tests\Feature\Api;

use App\Models\HargaPaket;
use App\Models\Kela;
use App\Models\Paket;
use App\Models\Siswa;
use App\Models\SiswaPaket;
use App\Models\Tagihan;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class PaketTest extends TestCase
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

    private function paketAktifContext(): array
    {
        $kela = Kela::create([
            'nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika',
            'kapasitas' => 10, 'status' => 'aktif',
        ]);
        $paketAktif = Paket::create(['nama' => 'Paket 12x', 'jumlah_pertemuan' => 12]);
        $paketBaru = Paket::create(['nama' => 'Paket 16x', 'jumlah_pertemuan' => 16]);
        HargaPaket::create(['kelas_id' => $kela->id, 'paket_id' => $paketAktif->id, 'harga' => 500000]);
        HargaPaket::create(['kelas_id' => $kela->id, 'paket_id' => $paketBaru->id, 'harga' => 650000]);
        $siswa = Siswa::create([
            'nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01',
            'tingkat_id' => $this->tingkatId(), 'status' => 'aktif',
        ]);
        $kela->siswa()->attach($siswa->id, [
            'tgl_masuk' => '2026-07-13',
            'status' => 'aktif',
        ]);
        $siswaPaket = SiswaPaket::create([
            'siswa_id' => $siswa->id,
            'kelas_id' => $kela->id,
            'paket_id' => $paketAktif->id,
            'tgl_mulai' => '2026-07-13',
            'tgl_selesai' => '2026-08-13',
            'status' => 'aktif',
        ]);

        return compact('kela', 'paketAktif', 'paketBaru', 'siswa', 'siswaPaket');
    }

    public function test_create_paket()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Paket 12x Pertemuan',
            'jumlah_pertemuan' => 12,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.nama', 'Paket 12x Pertemuan');
    }

    public function test_paket_validation()
    {
        $response = $this->actingAs($this->auth())->postJson('/api/paket', []);

        $response->assertStatus(422);
    }

    public function test_index_paket()
    {
        $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Paket 16x Pertemuan', 'jumlah_pertemuan' => 16,
        ]);

        $response = $this->actingAs($this->auth())->getJson('/api/paket');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_update_paket()
    {
        $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Old Name', 'jumlah_pertemuan' => 12,
        ]);

        $response = $this->actingAs($this->auth())->putJson('/api/paket/1', [
            'nama' => 'New Name', 'jumlah_pertemuan' => 12,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.nama', 'New Name');
    }

    public function test_delete_paket()
    {
        $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Test', 'jumlah_pertemuan' => 12,
        ]);

        $response = $this->actingAs($this->auth())->deleteJson('/api/paket/1');

        $response->assertStatus(200);
        $this->assertDatabaseMissing('pakets', ['id' => 1]);
    }

    public function test_delete_paket_yang_masih_dipakai_ditolak()
    {
        $this->actingAs($this->auth())->postJson('/api/paket', [
            'nama' => 'Test', 'jumlah_pertemuan' => 12,
        ]);

        $kela = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'status' => 'aktif']);
        $siswa = Siswa::create([
            'nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01',
            'tingkat_id' => $this->tingkatId(), 'status' => 'aktif',
        ]);
        SiswaPaket::create([
            'siswa_id' => $siswa->id, 'kelas_id' => $kela->id, 'paket_id' => 1,
            'tgl_mulai' => now()->toDateString(), 'tgl_selesai' => now()->addMonth()->toDateString(),
            'status' => 'aktif',
        ]);

        $response = $this->actingAs($this->auth())->deleteJson('/api/paket/1');

        $response->assertStatus(422);
        $this->assertDatabaseHas('pakets', ['id' => 1]);
    }

    public function test_assign_paket_menggunakan_tanggal_mulai_yang_dipilih()
    {
        $kela = Kela::create([
            'nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika',
            'kapasitas' => 10, 'status' => 'aktif',
        ]);
        $paket = Paket::create(['nama' => 'Paket 12x', 'jumlah_pertemuan' => 12]);
        HargaPaket::create(['kelas_id' => $kela->id, 'paket_id' => $paket->id, 'harga' => 500000]);
        $siswa = Siswa::create([
            'nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01',
            'tingkat_id' => $this->tingkatId(), 'status' => 'aktif',
        ]);
        $kela->siswa()->attach($siswa->id, [
            'tgl_masuk' => now()->toDateString(),
            'status' => 'aktif',
        ]);

        $this->actingAs($this->auth())->postJson("/api/siswa/{$siswa->id}/paket", [
            'siswa_id' => $siswa->id,
            'kelas_id' => $kela->id,
            'paket_id' => $paket->id,
            'tgl_mulai' => '2026-01-31',
        ])->assertCreated();

        $siswaPaket = SiswaPaket::where('siswa_id', $siswa->id)->firstOrFail();
        $this->assertSame('2026-01-31', $siswaPaket->tgl_mulai->toDateString());
        $this->assertSame('2026-02-28', $siswaPaket->tgl_selesai->toDateString());
        $this->assertDatabaseHas('kelas_siswa', [
            'siswa_id' => $siswa->id,
            'kelas_id' => $kela->id,
            'tgl_masuk' => '2026-01-31',
        ]);
    }

    public function test_ganti_paket_dijadwalkan_untuk_periode_berikutnya()
    {
        $context = $this->paketAktifContext();

        $response = $this->actingAs($this->auth())
            ->postJson("/api/siswa-paket/{$context['siswaPaket']->id}/ganti", [
                'paket_id' => $context['paketBaru']->id,
            ]);

        $response->assertOk()
            ->assertJsonPath('data.status', 'terjadwal')
            ->assertJsonPath('data.paket_id', $context['paketBaru']->id);

        $context['siswaPaket']->refresh();
        $this->assertSame('aktif', $context['siswaPaket']->status);

        $terjadwal = SiswaPaket::where('status', 'terjadwal')->firstOrFail();
        $this->assertSame('2026-08-13', $terjadwal->tgl_mulai->toDateString());
        $this->assertSame('2026-09-13', $terjadwal->tgl_selesai->toDateString());
        $this->assertDatabaseHas('tagihans', [
            'siswa_id' => $context['siswa']->id,
            'siswa_paket_id' => $terjadwal->id,
            'jumlah' => 650000,
            'status' => 'pending',
        ]);
    }

    public function test_mengubah_paket_berikutnya_tidak_membuat_data_ganda()
    {
        $context = $this->paketAktifContext();
        $paketLain = Paket::create(['nama' => 'Paket 20x', 'jumlah_pertemuan' => 20]);
        HargaPaket::create([
            'kelas_id' => $context['kela']->id,
            'paket_id' => $paketLain->id,
            'harga' => 800000,
        ]);

        $url = "/api/siswa-paket/{$context['siswaPaket']->id}/ganti";
        $this->actingAs($this->auth())->postJson($url, ['paket_id' => $context['paketBaru']->id])->assertOk();
        $this->actingAs($this->auth())->postJson($url, ['paket_id' => $paketLain->id])->assertOk();

        $this->assertSame(1, SiswaPaket::where('status', 'terjadwal')->count());
        $terjadwal = SiswaPaket::where('status', 'terjadwal')->firstOrFail();
        $this->assertSame($paketLain->id, $terjadwal->paket_id);
        $this->assertSame(1, Tagihan::where('siswa_paket_id', $terjadwal->id)->count());
        $this->assertSame(800000.0, (float) $terjadwal->tagihan->jumlah);
    }

    public function test_scheduler_mengaktifkan_paket_yang_sudah_terjadwal()
    {
        $context = $this->paketAktifContext();
        $this->actingAs($this->auth())
            ->postJson("/api/siswa-paket/{$context['siswaPaket']->id}/ganti", [
                'paket_id' => $context['paketBaru']->id,
            ])
            ->assertOk();

        $this->travelTo(Carbon::parse('2026-08-13 01:00:00'));
        $this->artisan('tagihan:generate')->assertSuccessful();

        $this->assertDatabaseHas('siswa_pakets', [
            'id' => $context['siswaPaket']->id,
            'status' => 'selesai',
        ]);
        $this->assertDatabaseHas('siswa_pakets', [
            'paket_id' => $context['paketBaru']->id,
            'status' => 'aktif',
        ]);
        $this->assertSame(1, Tagihan::count());
    }

    public function test_scheduler_tetap_memperpanjang_paket_lama_jika_tidak_ada_pergantian()
    {
        $context = $this->paketAktifContext();

        $this->travelTo(Carbon::parse('2026-08-13 01:00:00'));
        $this->artisan('tagihan:generate')->assertSuccessful();

        $this->assertDatabaseHas('siswa_pakets', [
            'id' => $context['siswaPaket']->id,
            'status' => 'selesai',
        ]);
        $this->assertDatabaseHas('siswa_pakets', [
            'siswa_id' => $context['siswa']->id,
            'paket_id' => $context['paketAktif']->id,
            'status' => 'aktif',
        ]);
        $this->assertSame(1, Tagihan::count());
        $this->assertNotNull(Tagihan::firstOrFail()->siswa_paket_id);
    }
}
