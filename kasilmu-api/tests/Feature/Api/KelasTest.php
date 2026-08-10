<?php

namespace Tests\Feature\Api;

use App\Models\HargaPaket;
use App\Models\Kela;
use App\Models\Paket;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\SiswaPaket;
use App\Models\Tagihan;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KelasTest extends TestCase
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

    public function test_siswa_tidak_bisa_aktif_di_dua_kelas_sekaligus()
    {
        $kelaA = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $kelaB = Kela::create(['nama' => 'Kelas B', 'mata_pelajaran' => 'Fisika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $siswa = Siswa::create(['nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif', 'tingkat_id' => $this->tingkatId()]);

        $this->actingAs($this->auth())->postJson("/api/kelas/{$kelaA->id}/siswa", ['siswa_id' => $siswa->id])
            ->assertStatus(200);

        $response = $this->actingAs($this->auth())->postJson("/api/kelas/{$kelaB->id}/siswa", ['siswa_id' => $siswa->id]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('kelas_siswa', ['kelas_id' => $kelaB->id, 'siswa_id' => $siswa->id]);
    }

    public function test_siswa_bisa_pindah_kelas_setelah_dikeluarkan_dari_kelas_lama()
    {
        $kelaA = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $kelaB = Kela::create(['nama' => 'Kelas B', 'mata_pelajaran' => 'Fisika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $siswa = Siswa::create(['nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif', 'tingkat_id' => $this->tingkatId()]);

        $this->actingAs($this->auth())->postJson("/api/kelas/{$kelaA->id}/siswa", ['siswa_id' => $siswa->id]);
        $this->actingAs($this->auth())->deleteJson("/api/kelas/{$kelaA->id}/siswa/{$siswa->id}");

        $response = $this->actingAs($this->auth())->postJson("/api/kelas/{$kelaB->id}/siswa", ['siswa_id' => $siswa->id]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kelas_siswa', ['kelas_id' => $kelaB->id, 'siswa_id' => $siswa->id, 'status' => 'aktif']);
    }

    public function test_mengeluarkan_siswa_dari_kelas_ikut_menghapus_paket_dan_tagihan_yang_belum_dibayar()
    {
        $kela = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $siswa = Siswa::create(['nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif', 'tingkat_id' => $this->tingkatId()]);
        $paket = Paket::create(['nama' => 'Paket 8x', 'jumlah_pertemuan' => 8]);
        HargaPaket::create(['kelas_id' => $kela->id, 'paket_id' => $paket->id, 'harga' => 500000]);

        $this->actingAs($this->auth())->postJson("/api/kelas/{$kela->id}/siswa", ['siswa_id' => $siswa->id]);
        $this->actingAs($this->auth())->postJson('/api/siswa-paket', [
            'siswa_id' => $siswa->id, 'kelas_id' => $kela->id, 'paket_id' => $paket->id, 'tgl_mulai' => now()->toDateString(),
        ]);

        $response = $this->actingAs($this->auth())->deleteJson("/api/kelas/{$kela->id}/siswa/{$siswa->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('kelas_siswa', ['kelas_id' => $kela->id, 'siswa_id' => $siswa->id]);
        $this->assertDatabaseMissing('siswa_pakets', ['siswa_id' => $siswa->id, 'kelas_id' => $kela->id]);
        $this->assertDatabaseMissing('tagihans', ['siswa_id' => $siswa->id]);
    }

    public function test_mengeluarkan_siswa_dari_kelas_tetap_menyimpan_paket_yang_sudah_dibayar()
    {
        $kela = Kela::create(['nama' => 'Kelas A', 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $siswa = Siswa::create(['nis' => '20260001', 'nama' => 'Siswa A', 'tgl_lahir' => '2010-01-01', 'status' => 'aktif', 'tingkat_id' => $this->tingkatId()]);
        $paket = Paket::create(['nama' => 'Paket 8x', 'jumlah_pertemuan' => 8]);
        HargaPaket::create(['kelas_id' => $kela->id, 'paket_id' => $paket->id, 'harga' => 500000]);

        $this->actingAs($this->auth())->postJson("/api/kelas/{$kela->id}/siswa", ['siswa_id' => $siswa->id]);
        $siswaPaket = SiswaPaket::create([
            'siswa_id' => $siswa->id, 'kelas_id' => $kela->id, 'paket_id' => $paket->id,
            'tgl_mulai' => now()->toDateString(), 'tgl_selesai' => now()->addMonth()->toDateString(), 'status' => 'aktif',
        ]);
        $tagihan = Tagihan::create([
            'siswa_id' => $siswa->id, 'siswa_paket_id' => $siswaPaket->id, 'jenis' => 'spp',
            'jumlah' => 500000, 'tenggat' => now()->toDateString(), 'status' => 'lunas',
        ]);
        Pembayaran::create(['tagihan_id' => $tagihan->id, 'jumlah' => 500000, 'metode' => 'tunai', 'tgl_bayar' => now()->toDateString()]);

        $response = $this->actingAs($this->auth())->deleteJson("/api/kelas/{$kela->id}/siswa/{$siswa->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('kelas_siswa', ['kelas_id' => $kela->id, 'siswa_id' => $siswa->id]);
        $this->assertDatabaseHas('siswa_pakets', ['id' => $siswaPaket->id]);
        $this->assertDatabaseHas('tagihans', ['id' => $tagihan->id]);
    }
}
