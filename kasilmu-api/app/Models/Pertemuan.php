<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pertemuan extends Model
{
    protected $fillable = ['kelas_id', 'pertemuan_ke', 'tgl', 'materi', 'status'];

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kela::class, 'kelas_id');
    }

    public function presensis(): HasMany
    {
        return $this->hasMany(Presensi::class);
    }
}
