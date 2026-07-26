<?php

namespace App\Http\Controllers\Api;

use App\Models\Pembayaran;
use App\Models\Presensi;
use App\Models\Siswa;
use App\Models\SiswaPaket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LaporanController
{
    use ApiResponse;

    public function keuangan(Request $request)
    {
        $query = Pembayaran::with(['tagihan.siswa:id,nama,nis'])
            ->select('pembayarans.*');

        if ($dari = $request->dari) {
            $query->whereDate('tgl_bayar', '>=', $dari);
        }

        if ($sampai = $request->sampai) {
            $query->whereDate('tgl_bayar', '<=', $sampai);
        }

        $total = (clone $query)->sum('jumlah');

        return $this->success([
            'total_pendapatan' => $total,
            'detail' => $query->latest('tgl_bayar')->paginate($request->per_page ?? 50),
        ]);
    }

    public function siswa(Request $request)
    {
        $siswas = Siswa::withCount(['tagihans', 'nilais'])
            ->when($request->status, fn ($q, $v) => $q->where('status', $v))
            ->latest()
            ->paginate($request->per_page ?? 20);

        return $this->paginated($siswas);
    }

    public function kehadiran(Request $request)
    {
        $query = Presensi::select(
            'presensis.siswa_id',
            DB::raw('COUNT(*) as total_pertemuan'),
            DB::raw("SUM(CASE WHEN presensis.status = 'hadir' THEN 1 ELSE 0 END) as hadir"),
            DB::raw("SUM(CASE WHEN presensis.status = 'tidak_hadir' THEN 1 ELSE 0 END) as tidak_hadir")
        )
            ->join('pertemuans', 'presensis.pertemuan_id', '=', 'pertemuans.id')
            ->with('siswa:id,nama,nis')
            ->groupBy('presensis.siswa_id');

        if ($request->siswa_id) {
            $query->where('presensis.siswa_id', $request->siswa_id);
        }

        if ($kelasId = $request->kelas_id) {
            $query->where('pertemuans.kelas_id', $kelasId);
        }

        if ($tglMulai = $request->tgl_mulai) {
            $query->whereDate('pertemuans.tgl', '>=', $tglMulai);
        }

        if ($tglSelesai = $request->tgl_selesai) {
            $query->whereDate('pertemuans.tgl', '<=', $tglSelesai);
        }

        $result = $query->paginate($request->per_page ?? 20);

        $result->getCollection()->transform(function ($item) {
            $siswaPaket = SiswaPaket::with('paket')
                ->where('siswa_id', $item->siswa_id)
                ->where('status', 'aktif')
                ->first();

            $item->paket = $siswaPaket?->paket?->nama;
            $item->kuota = $siswaPaket?->paket?->jumlah_pertemuan;
            $item->sisa = max(0, ($siswaPaket?->paket?->jumlah_pertemuan ?? 0) - $item->hadir);

            return $item;
        });

        return $this->paginated($result);
    }
}
