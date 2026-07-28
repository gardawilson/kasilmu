<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController
{
    use ApiResponse;

    private const MANAGED_ROLES = ['admin', 'siswa', 'orang_tua'];

    private const DEFAULT_PASSWORD = 'Kasilmu1234';

    public function index(Request $request)
    {
        $query = User::with('roles:id,name');

        if ($search = $request->search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($role = $request->role) {
            $query->role($role);
        }

        return $this->paginated($query->latest()->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:50|alpha_dash|unique:users,username',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'nullable|string|min:6',
            'no_telp' => 'nullable|string|max:20',
            'role' => ['required', Rule::in(self::MANAGED_ROLES)],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password'] ?? self::DEFAULT_PASSWORD),
            'no_telp' => $validated['no_telp'] ?? null,
            'is_active' => true,
        ]);
        $user->assignRole($validated['role']);

        return $this->success($user->load('roles:id,name'), 'Akun berhasil ditambahkan', 201);
    }

    public function update(Request $request, User $user)
    {
        if ($user->hasRole('tutor')) {
            return $this->error('Akun pengajar dikelola dari menu Pengajar', 422);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => ['required', 'string', 'max:50', 'alpha_dash', Rule::unique('users', 'username')->ignore($user->id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => 'nullable|string|min:6',
            'no_telp' => 'nullable|string|max:20',
            'is_active' => 'nullable|boolean',
        ]);

        if (! empty($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return $this->success($user->load('roles:id,name'), 'Akun berhasil diperbarui');
    }

    public function destroy(Request $request, User $user)
    {
        if ($user->hasRole('tutor')) {
            return $this->error('Akun pengajar dikelola dari menu Pengajar', 422);
        }

        if ($user->id === $request->user()->id) {
            return $this->error('Tidak bisa menghapus akun sendiri', 422);
        }

        $user->delete();

        return $this->success(null, 'Akun berhasil dihapus');
    }
}
