<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Jenjang extends Model
{
    protected $fillable = ['kode', 'nama', 'urutan', 'is_active'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function tingkats(): HasMany
    {
        return $this->hasMany(Tingkat::class)->orderBy('urutan');
    }
}
