<?php

namespace App\Http\Controllers\Api;

use App\Models\Pembayaran;
use Illuminate\Http\Request;

class PembayaranController
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Pembayaran::with(['tagihan.siswa:id,nama,nis']);

        if ($tagihan_id = $request->tagihan_id) {
            $query->where('tagihan_id', $tagihan_id);
        }

        return $this->paginated($query->latest('tgl_bayar')->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tagihan_id' => 'required|exists:tagihans,id',
            'jumlah'     => 'required|numeric|min:0',
            'metode'     => 'required|in:tunai,transfer',
            'tgl_bayar'  => 'required|date',
            'keterangan' => 'nullable|string',
        ]);

        $pembayaran = Pembayaran::create($validated);

        $tagihan = $pembayaran->tagihan;
        $totalBayar = $tagihan->pembayarans()->sum('jumlah');

        if ($totalBayar >= $tagihan->jumlah) {
            $tagihan->update(['status' => 'lunas']);
        }

        return $this->success($pembayaran->load('tagihan.siswa:id,nama,nis'), 'Pembayaran berhasil dicatat', 201);
    }

    public function show(Pembayaran $pembayaran)
    {
        $pembayaran->load('tagihan.siswa');

        return $this->success($pembayaran);
    }

    public function destroy(Pembayaran $pembayaran)
    {
        $tagihan = $pembayaran->tagihan;
        $pembayaran->delete();

        $totalBayar = $tagihan->pembayarans()->sum('jumlah');
        if ($totalBayar < $tagihan->jumlah) {
            $tagihan->update(['status' => 'pending']);
        }

        return $this->success(null, 'Pembayaran berhasil dihapus');
    }
}
