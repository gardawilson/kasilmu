<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Siswa extends Model
{
    protected $fillable = [
        'nis', 'nama', 'email', 'no_telp', 'tgl_lahir', 'alamat',
        'sekolah', 'kelas_asal', 'tingkat', 'jenjang', 'nama_ortu', 'no_telp_ortu', 'foto', 'status'
    ];

    public function kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kela::class, 'kelas_siswa', 'siswa_id', 'kelas_id')
            ->withPivot(['tgl_masuk', 'tgl_keluar', 'status'])
            ->withTimestamps();
    }

    public function tagihans(): HasMany
    {
        return $this->hasMany(Tagihan::class);
    }

    public function nilais(): HasMany
    {
        return $this->hasMany(Nilai::class);
    }
}
