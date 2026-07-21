<?php

namespace App\Http\Controllers\Api;

use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Presensi;
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
            'detail'           => $query->latest('tgl_bayar')->paginate($request->per_page ?? 50),
        ]);
    }

    public function siswa(Request $request)
    {
        $siswas = Siswa::withCount(['tagihans', 'nilais'])
            ->when($request->status, fn($q, $v) => $q->where('status', $v))
            ->latest()
            ->paginate($request->per_page ?? 20);

        return $this->paginated($siswas);
    }

    public function kehadiran(Request $request)
    {
        $query = Presensi::select(
            'siswa_id',
            DB::raw('COUNT(*) as total_pertemuan'),
            DB::raw("SUM(CASE WHEN status = 'hadir' THEN 1 ELSE 0 END) as hadir"),
            DB::raw("SUM(CASE WHEN status = 'izin' THEN 1 ELSE 0 END) as izin"),
            DB::raw("SUM(CASE WHEN status = 'sakit' THEN 1 ELSE 0 END) as sakit"),
            DB::raw("SUM(CASE WHEN status = 'alpha' THEN 1 ELSE 0 END) as alpha")
        )
            ->with('siswa:id,nama,nis')
            ->groupBy('siswa_id');

        if ($request->siswa_id) {
            $query->where('siswa_id', $request->siswa_id);
        }

        return $this->paginated($query->paginate($request->per_page ?? 20));
    }
}
