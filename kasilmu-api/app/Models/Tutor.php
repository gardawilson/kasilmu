<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tutor extends Model
{
    protected $fillable = [
        'nip', 'nama', 'email', 'no_telp', 'bidang_ajar',
        'tarif_per_pertemuan', 'pendidikan_terakhir', 'foto', 'is_active'
    ];

    public function kelas(): HasMany
    {
        return $this->hasMany(Kela::class, 'tutor_id');
    }
}
