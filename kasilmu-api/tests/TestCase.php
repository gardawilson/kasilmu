<?php

namespace Tests;

use App\Models\Jenjang;
use App\Models\Tingkat;
use Database\Seeders\MasterPendidikanSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function jenjangId(string $kode = 'SD'): int
    {
        $this->seed(MasterPendidikanSeeder::class);

        return Jenjang::where('kode', $kode)->firstOrFail()->id;
    }

    protected function tingkatId(string $kode = 'SD', int $urutan = 3): int
    {
        $this->seed(MasterPendidikanSeeder::class);

        return Tingkat::where('urutan', $urutan)
            ->whereHas('jenjang', fn ($query) => $query->where('kode', $kode))
            ->firstOrFail()
            ->id;
    }
}
