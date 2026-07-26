<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class SiswaPaket extends Model
{
    protected $table = 'siswa_pakets';

    protected $fillable = ['siswa_id', 'kelas_id', 'paket_id', 'tgl_mulai', 'tgl_selesai', 'status'];

    protected function casts(): array
    {
        return [
            'tgl_mulai' => 'date',
            'tgl_selesai' => 'date',
        ];
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class);
    }

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kela::class);
    }

    public function paket(): BelongsTo
    {
        return $this->belongsTo(Paket::class);
    }

    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }

    public function getSisaPertemuanAttribute(): int
    {
        $hadir = DB::table('presensis')
            ->join('pertemuans', 'presensis.pertemuan_id', '=', 'pertemuans.id')
            ->where('presensis.siswa_id', $this->siswa_id)
            ->where('pertemuans.kelas_id', $this->kelas_id)
            ->whereBetween('pertemuans.tgl', [$this->tgl_mulai, $this->tgl_selesai])
            ->where('presensis.status', 'hadir')
            ->count();

        return max(0, $this->paket->jumlah_pertemuan - $hadir);
    }

    public function getHadirCountAttribute(): int
    {
        return DB::table('presensis')
            ->join('pertemuans', 'presensis.pertemuan_id', '=', 'pertemuans.id')
            ->where('presensis.siswa_id', $this->siswa_id)
            ->where('pertemuans.kelas_id', $this->kelas_id)
            ->whereBetween('pertemuans.tgl', [$this->tgl_mulai, $this->tgl_selesai])
            ->where('presensis.status', 'hadir')
            ->count();
    }
}
