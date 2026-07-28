<?php

namespace App\Http\Controllers\Api;

use App\Models\HargaPaket;
use Illuminate\Http\Request;

class HargaPaketController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $validated = $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        $hargaPakets = HargaPaket::with('paket:id,nama,jumlah_pertemuan')
            ->where('kelas_id', $validated['kelas_id'])
            ->get();

        return $this->success($hargaPakets);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'paket_id' => 'required|exists:pakets,id',
            'harga' => 'required|numeric|min:0',
        ]);

        $hargaPaket = HargaPaket::updateOrCreate(
            ['kelas_id' => $validated['kelas_id'], 'paket_id' => $validated['paket_id']],
            ['harga' => $validated['harga']]
        );

        return $this->success($hargaPaket->load('paket:id,nama,jumlah_pertemuan'), 'Harga paket berhasil disimpan');
    }
}
