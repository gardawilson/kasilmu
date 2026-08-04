<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tutor extends Model
{
    protected $fillable = [
        'user_id', 'nip', 'nama', 'email', 'no_telp', 'bidang_ajar',
        'pendidikan_terakhir', 'foto', 'is_active',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function pertemuans(): HasMany
    {
        return $this->hasMany(Pertemuan::class);
    }

    public function kelasIds(): array
    {
        return $this->pertemuans()->distinct()->pluck('kelas_id')->all();
    }
}
