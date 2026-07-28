<?php

namespace App\Http\Controllers\Api;

use App\Models\Pertemuan;
use Illuminate\Http\Request;

trait TutorScope
{
    /**
     * Returns the kelas_id list a tutor is allowed to see (kelas they've taught
     * at least one pertemuan in), or null if the caller isn't a scoped tutor
     * (i.e. admin, or any other role — no restriction should be applied).
     */
    protected function tutorKelasIds(Request $request): ?array
    {
        $user = $request->user();

        if (! $user->hasRole('tutor') || $user->hasRole('admin')) {
            return null;
        }

        return Pertemuan::where('tutor_id', $user->tutor?->id)
            ->distinct()
            ->pluck('kelas_id')
            ->all();
    }
}
