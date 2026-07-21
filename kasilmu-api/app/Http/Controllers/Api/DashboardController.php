<?php

namespace App\Http\Controllers\Api;

use App\Models\Siswa;
use App\Models\Tutor;
use App\Models\Kela;
use App\Models\Pembayaran;
use App\Models\Presensi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController
{
    use ApiResponse;

    public function index()
    {
        $totalSiswa = Siswa::count();
        $totalSiswaAktif = Siswa::where('status', 'aktif')->count();
        $totalTutor = Tutor::count();
        $totalKelas = Kela::where('status', 'aktif')->count();

        $pendapatanBulanIni = Pembayaran::whereMonth('tgl_bayar', now()->month)
            ->whereYear('tgl_bayar', now()->year)
            ->sum('jumlah');

        $pendapatanHariIni = Pembayaran::whereDate('tgl_bayar', today())->sum('jumlah');

        $pendapatanPerBulan = Pembayaran::select(
            DB::raw('MONTH(tgl_bayar) as bulan'),
            DB::raw('YEAR(tgl_bayar) as tahun'),
            DB::raw('SUM(jumlah) as total')
        )
            ->whereYear('tgl_bayar', now()->year)
            ->groupBy('tahun', 'bulan')
            ->orderBy('bulan')
            ->get();

        return $this->success([
            'total_siswa'          => $totalSiswa,
            'total_siswa_aktif'    => $totalSiswaAktif,
            'total_tutor'          => $totalTutor,
            'total_kelas_aktif'    => $totalKelas,
            'pendapatan_bulan_ini' => $pendapatanBulanIni,
            'pendapatan_hari_ini'  => $pendapatanHariIni,
            'pendapatan_per_bulan' => $pendapatanPerBulan,
        ]);
    }
}
