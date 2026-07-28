<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HargaPaket extends Model
{
    protected $fillable = ['kelas_id', 'paket_id', 'harga'];

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kela::class, 'kelas_id');
    }

    public function paket(): BelongsTo
    {
        return $this->belongsTo(Paket::class);
    }
}
