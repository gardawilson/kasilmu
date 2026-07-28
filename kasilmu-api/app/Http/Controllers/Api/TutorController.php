<?php

namespace App\Http\Controllers\Api;

use App\Models\Tutor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class TutorController
{
    use ApiResponse;

    private const DEFAULT_PASSWORD = 'Kasilmu1234';

    public function index(Request $request)
    {
        $query = Tutor::with('user:id,username,email,is_active');

        if ($search = $request->search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', "%{$search}%")
                    ->orWhere('bidang_ajar', 'like', "%{$search}%");
            });
        }

        return $this->paginated($query->latest()->paginate($request->per_page ?? 10));
    }

    private function generateNip(): string
    {
        $year = now()->format('Y');
        $last = Tutor::where('nip', 'like', $year.'%')->orderByDesc('nip')->value('nip');
        $next = $last ? ((int) substr($last, 4)) + 1 : 1;

        return $year.str_pad((string) $next, 4, '0', STR_PAD_LEFT);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'username' => 'required|string|max:50|alpha_dash|unique:users,username',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'nullable|string|min:6',
            'no_telp' => 'nullable|string|max:20',
            'bidang_ajar' => 'required|string|max:255',
            'tarif_per_pertemuan' => 'required|numeric|min:0',
            'pendidikan_terakhir' => 'nullable|string|max:100',
            'foto' => 'nullable|string|max:255',
        ]);

        $password = $validated['password'] ?? self::DEFAULT_PASSWORD;
        $username = $validated['username'];
        unset($validated['password'], $validated['username']);

        $tutor = DB::transaction(function () use ($validated, $password, $username) {
            $user = User::create([
                'name' => $validated['nama'],
                'username' => $username,
                'email' => $validated['email'],
                'password' => bcrypt($password),
                'no_telp' => $validated['no_telp'] ?? null,
                'is_active' => true,
            ]);
            $user->assignRole('tutor');

            $validated['user_id'] = $user->id;
            $validated['nip'] = $this->generateNip();

            return Tutor::create($validated);
        });

        return $this->success($tutor->load('user:id,username,email,is_active'), 'Tutor berhasil ditambahkan', 201);
    }

    public function show(Tutor $tutor)
    {
        $tutor->load(['pertemuans.kelas:id,nama', 'user:id,username,email,is_active']);

        return $this->success($tutor);
    }

    public function update(Request $request, Tutor $tutor)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'username' => ['required', 'string', 'max:50', 'alpha_dash', Rule::unique('users', 'username')->ignore($tutor->user_id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($tutor->user_id)],
            'password' => 'nullable|string|min:6',
            'no_telp' => 'nullable|string|max:20',
            'bidang_ajar' => 'required|string|max:255',
            'tarif_per_pertemuan' => 'required|numeric|min:0',
            'pendidikan_terakhir' => 'nullable|string|max:100',
            'foto' => 'nullable|string|max:255',
        ]);

        $password = $validated['password'] ?? null;
        $username = $validated['username'];
        unset($validated['password'], $validated['username']);

        DB::transaction(function () use ($tutor, $validated, $password, $username) {
            if ($tutor->user_id) {
                $tutor->user->update([
                    'name' => $validated['nama'],
                    'username' => $username,
                    'email' => $validated['email'],
                    'no_telp' => $validated['no_telp'] ?? null,
                    ...($password ? ['password' => bcrypt($password)] : []),
                ]);
            } else {
                $user = User::create([
                    'name' => $validated['nama'],
                    'username' => $username,
                    'email' => $validated['email'],
                    'password' => bcrypt($password ?? self::DEFAULT_PASSWORD),
                    'no_telp' => $validated['no_telp'] ?? null,
                    'is_active' => true,
                ]);
                $user->assignRole('tutor');
                $validated['user_id'] = $user->id;
            }

            $tutor->update($validated);
        });

        return $this->success($tutor->fresh()->load('user:id,username,email,is_active'), 'Tutor berhasil diperbarui');
    }

    public function destroy(Tutor $tutor)
    {
        $tutor->user?->delete();
        $tutor->delete();

        return $this->success(null, 'Tutor berhasil dihapus');
    }
}
