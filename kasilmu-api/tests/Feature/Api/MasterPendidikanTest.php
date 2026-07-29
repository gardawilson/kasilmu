<?php

namespace Tests\Feature\Api;

use App\Models\Jenjang;
use App\Models\Siswa;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\MasterPendidikanSeeder;
use Database\Seeders\RolePermissionSeeder;
use Database\Seeders\SiswaSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MasterPendidikanTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolePermissionSeeder::class);
        $this->seed(AdminUserSeeder::class);
        $this->seed(MasterPendidikanSeeder::class);
    }

    private function admin(): User
    {
        return User::where('email', 'admin@kasilmu.com')->firstOrFail();
    }

    public function test_index_mengembalikan_jenjang_beserta_tingkat(): void
    {
        $response = $this->actingAs($this->admin())->getJson('/api/jenjang');

        $response->assertOk()
            ->assertJsonPath('data.0.kode', 'SD')
            ->assertJsonCount(6, 'data.0.tingkats');
    }

    public function test_admin_bisa_menambah_jenjang_dan_tingkat(): void
    {
        $jenjangResponse = $this->actingAs($this->admin())->postJson('/api/jenjang', [
            'kode' => 'PAUD',
            'nama' => 'Pendidikan Anak Usia Dini',
            'urutan' => 0,
            'is_active' => true,
        ]);

        $jenjangResponse->assertCreated();
        $jenjangId = $jenjangResponse->json('data.id');

        $this->actingAs($this->admin())->postJson('/api/tingkat', [
            'jenjang_id' => $jenjangId,
            'nama' => 'Kelompok A',
            'urutan' => 1,
            'is_active' => true,
        ])->assertCreated();

        $this->assertDatabaseHas('tingkats', [
            'jenjang_id' => $jenjangId,
            'nama' => 'Kelompok A',
        ]);
    }

    public function test_jenjang_nonaktif_tidak_muncul_di_pilihan_default(): void
    {
        Jenjang::where('kode', 'SD')->update(['is_active' => false]);

        $response = $this->actingAs($this->admin())->getJson('/api/jenjang');

        $response->assertOk();
        $this->assertNotContains('SD', collect($response->json('data'))->pluck('kode'));
    }

    public function test_siswa_seeder_menggunakan_relasi_tingkat(): void
    {
        $this->seed(SiswaSeeder::class);

        $this->assertDatabaseCount('siswas', 10);
        $this->assertSame(0, Siswa::whereNull('tingkat_id')->count());
    }
}
