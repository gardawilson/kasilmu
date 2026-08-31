<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Paket extends Model
{
    protected $fillable = ['kelas_id', 'nama', 'jumlah_pertemuan', 'harga', 'deskripsi'];

    protected function casts(): array
    {
        return [
            'harga' => 'decimal:2',
        ];
    }

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kela::class, 'kelas_id');
    }
}
