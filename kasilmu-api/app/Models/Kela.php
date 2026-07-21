<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kela extends Model
{
    protected $fillable = [
        'nama', 'mata_pelajaran', 'deskripsi', 'durasi_bulan', 'tutor_id', 'harga',
        'kapasitas', 'ruang', 'status'
    ];

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(Tutor::class, 'tutor_id');
    }

    public function siswa(): BelongsToMany
    {
        return $this->belongsToMany(Siswa::class, 'kelas_siswa', 'kelas_id', 'siswa_id')
            ->withPivot(['tgl_masuk', 'tgl_keluar', 'status'])
            ->withTimestamps();
    }

    public function jadwals(): HasMany
    {
        return $this->hasMany(Jadwal::class, 'kelas_id');
    }

    public function pertemuans(): HasMany
    {
        return $this->hasMany(Pertemuan::class, 'kelas_id');
    }

    public function nilais(): HasMany
    {
        return $this->hasMany(Nilai::class, 'kelas_id');
    }

    public function isFull(): bool
    {
        return $this->siswa()->wherePivot('status', 'aktif')->count() >= $this->kapasitas;
    }
}
