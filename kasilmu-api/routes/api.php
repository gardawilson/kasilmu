<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\HargaPaketController;
use App\Http\Controllers\Api\KelasController;
use App\Http\Controllers\Api\LaporanController;
use App\Http\Controllers\Api\NilaiController;
use App\Http\Controllers\Api\PaketController;
use App\Http\Controllers\Api\PembayaranController;
use App\Http\Controllers\Api\PertemuanController;
use App\Http\Controllers\Api\SekolahController;
use App\Http\Controllers\Api\SiswaController;
use App\Http\Controllers\Api\SiswaPaketController;
use App\Http\Controllers\Api\TagihanController;
use App\Http\Controllers\Api\TutorController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
    Route::put('/auth/password', [AuthController::class, 'updatePassword']);

    Route::middleware('role:admin')->group(function () {
        Route::post('siswa', [SiswaController::class, 'store']);
        Route::put('siswa/{siswa}', [SiswaController::class, 'update']);
        Route::delete('siswa/{siswa}', [SiswaController::class, 'destroy']);
        Route::get('sekolah', [SekolahController::class, 'index']);
        Route::post('sekolah', [SekolahController::class, 'store']);
        Route::put('sekolah/{sekolah}', [SekolahController::class, 'update']);
        Route::delete('sekolah/{sekolah}', [SekolahController::class, 'destroy']);
        Route::apiResource('tutor', TutorController::class);
        Route::post('kelas', [KelasController::class, 'store']);
        Route::put('kelas/{kela}', [KelasController::class, 'update']);
        Route::delete('kelas/{kela}', [KelasController::class, 'destroy']);
        Route::post('kelas/{kela}/siswa', [KelasController::class, 'addSiswa']);
        Route::delete('kelas/{kela}/siswa/{siswa}', [KelasController::class, 'removeSiswa']);
        Route::post('tagihan', [TagihanController::class, 'store']);
        Route::put('tagihan/{tagihan}', [TagihanController::class, 'update']);
        Route::delete('tagihan/{tagihan}', [TagihanController::class, 'destroy']);
        Route::post('pembayaran', [PembayaranController::class, 'store']);
        Route::delete('pembayaran/{pembayaran}', [PembayaranController::class, 'destroy']);
        Route::get('laporan/keuangan', [LaporanController::class, 'keuangan']);
        Route::get('laporan/siswa', [LaporanController::class, 'siswa']);
        Route::get('laporan/kehadiran', [LaporanController::class, 'kehadiran']);
        Route::get('dashboard', [DashboardController::class, 'index']);
        Route::apiResource('paket', PaketController::class);
        Route::post('siswa/{siswa}/paket', [SiswaPaketController::class, 'store']);
        Route::get('siswa/{siswa}/paket', [SiswaPaketController::class, 'aktif']);
        Route::put('siswa-paket/{siswaPaket}', [SiswaPaketController::class, 'update']);
        Route::delete('siswa-paket/{siswaPaket}', [SiswaPaketController::class, 'destroy']);
        Route::get('harga-paket', [HargaPaketController::class, 'index']);
        Route::post('harga-paket', [HargaPaketController::class, 'store']);
        Route::apiResource('user', UserController::class)->except('show');
    });

    Route::middleware('role:admin|tutor')->group(function () {
        Route::post('pertemuan/mulai', [PertemuanController::class, 'mulai']);
        Route::post('pertemuan', [PertemuanController::class, 'store']);
        Route::put('pertemuan/{pertemuan}', [PertemuanController::class, 'update']);
        Route::delete('pertemuan/{pertemuan}', [PertemuanController::class, 'destroy']);
        Route::post('pertemuan/{pertemuan}/presensi', [PertemuanController::class, 'storePresensi']);
        Route::post('nilai', [NilaiController::class, 'store']);
        Route::put('nilai/{nilai}', [NilaiController::class, 'update']);
        Route::delete('nilai/{nilai}', [NilaiController::class, 'destroy']);
    });

    Route::middleware('role:admin|tutor|siswa|orang_tua')->group(function () {
        Route::get('siswa', [SiswaController::class, 'index']);
        Route::get('siswa/{siswa}', [SiswaController::class, 'show']);
        Route::get('siswa-paket', [SiswaPaketController::class, 'index']);
        Route::get('kelas', [KelasController::class, 'index']);
        Route::get('kelas/{kela}', [KelasController::class, 'show']);
        Route::get('kelas/{kela}/pertemuan', [PertemuanController::class, 'byKelas']);
        Route::get('pertemuan', [PertemuanController::class, 'index']);
        Route::get('pertemuan/{pertemuan}', [PertemuanController::class, 'show']);
        Route::get('pertemuan/{pertemuan}/presensi', [PertemuanController::class, 'presensi']);
        Route::get('tagihan', [TagihanController::class, 'index']);
        Route::get('tagihan/{tagihan}', [TagihanController::class, 'show']);
        Route::get('pembayaran', [PembayaranController::class, 'index']);
        Route::get('pembayaran/{pembayaran}', [PembayaranController::class, 'show']);
        Route::get('nilai', [NilaiController::class, 'index']);
        Route::get('nilai/{nilai}', [NilaiController::class, 'show']);
    });
});
