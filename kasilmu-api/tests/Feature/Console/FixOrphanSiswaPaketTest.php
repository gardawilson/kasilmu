<?php

namespace Tests\Feature\Console;

use App\Models\HargaPaket;
use App\Models\Kela;
use App\Models\Paket;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\SiswaPaket;
use App\Models\Tagihan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FixOrphanSiswaPaketTest extends TestCase
{
    use RefreshDatabase;

    private function buatSiswaPaketOrphan(string $nis, string $statusTagihan, bool $dibayar): array
    {
        $kela = Kela::create(['nama' => "Kelas {$nis}", 'mata_pelajaran' => 'Matematika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $siswa = Siswa::create(['nis' => $nis, 'nama' => "Siswa {$nis}", 'tgl_lahir' => '2010-01-01', 'status' => 'aktif', 'tingkat_id' => $this->tingkatId()]);
        $paket = Paket::create(['nama' => 'Paket 8x', 'jumlah_pertemuan' => 8]);
        HargaPaket::create(['kelas_id' => $kela->id, 'paket_id' => $paket->id, 'harga' => 500000]);

        $siswaPaket = SiswaPaket::create([
            'siswa_id' => $siswa->id, 'kelas_id' => $kela->id, 'paket_id' => $paket->id,
            'tgl_mulai' => now()->toDateString(), 'tgl_selesai' => now()->addMonth()->toDateString(), 'status' => 'aktif',
        ]);
        $tagihan = Tagihan::create([
            'siswa_id' => $siswa->id, 'siswa_paket_id' => $siswaPaket->id, 'jenis' => 'spp',
            'jumlah' => 500000, 'tenggat' => now()->toDateString(), 'status' => $statusTagihan,
        ]);
        if ($dibayar) {
            Pembayaran::create(['tagihan_id' => $tagihan->id, 'jumlah' => 500000, 'metode' => 'tunai', 'tgl_bayar' => now()->toDateString()]);
        }

        // Simulasikan bug lama: paket aktif tapi pivot kelas_siswa sudah tidak ada.
        $siswa->kelas()->detach($kela->id);

        return compact('kela', 'siswa', 'paket', 'siswaPaket', 'tagihan');
    }

    public function test_orphan_tanpa_pembayaran_dihapus()
    {
        ['siswaPaket' => $siswaPaket, 'tagihan' => $tagihan] = $this->buatSiswaPaketOrphan('20260001', 'pending', false);

        $this->artisan('siswa:fix-orphan-paket')->assertSuccessful();

        $this->assertDatabaseMissing('siswa_pakets', ['id' => $siswaPaket->id]);
        $this->assertDatabaseMissing('tagihans', ['id' => $tagihan->id]);
    }

    public function test_orphan_sudah_dibayar_dikembalikan_ke_kelas()
    {
        ['kela' => $kela, 'siswa' => $siswa, 'siswaPaket' => $siswaPaket] = $this->buatSiswaPaketOrphan('20260002', 'lunas', true);

        $this->artisan('siswa:fix-orphan-paket')->assertSuccessful();

        $this->assertDatabaseHas('siswa_pakets', ['id' => $siswaPaket->id]);
        $this->assertDatabaseHas('kelas_siswa', ['kelas_id' => $kela->id, 'siswa_id' => $siswa->id, 'status' => 'aktif']);
    }

    public function test_orphan_sudah_dibayar_tapi_siswa_sudah_aktif_di_kelas_lain_tidak_diubah()
    {
        ['kela' => $kelaLama, 'siswa' => $siswa, 'siswaPaket' => $siswaPaket] = $this->buatSiswaPaketOrphan('20260003', 'lunas', true);

        $kelaBaru = Kela::create(['nama' => 'Kelas Baru', 'mata_pelajaran' => 'Fisika', 'kapasitas' => 10, 'tarif_per_pertemuan' => 100000, 'status' => 'aktif']);
        $siswa->kelas()->attach($kelaBaru->id, ['tgl_masuk' => now()->toDateString(), 'status' => 'aktif']);

        $this->artisan('siswa:fix-orphan-paket')->assertSuccessful();

        $this->assertDatabaseHas('siswa_pakets', ['id' => $siswaPaket->id]);
        $this->assertDatabaseMissing('kelas_siswa', ['kelas_id' => $kelaLama->id, 'siswa_id' => $siswa->id]);
        $this->assertDatabaseHas('kelas_siswa', ['kelas_id' => $kelaBaru->id, 'siswa_id' => $siswa->id, 'status' => 'aktif']);
    }

    public function test_dry_run_tidak_mengubah_data()
    {
        ['siswaPaket' => $siswaPaket] = $this->buatSiswaPaketOrphan('20260004', 'pending', false);

        $this->artisan('siswa:fix-orphan-paket --dry-run')->assertSuccessful();

        $this->assertDatabaseHas('siswa_pakets', ['id' => $siswaPaket->id]);
    }
}
