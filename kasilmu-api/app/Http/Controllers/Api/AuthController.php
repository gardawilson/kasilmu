<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController
{
    use ApiResponse;

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        $token = $user->createToken('kasilmu-token')->plainTextToken;

        return $this->success([
            'user'  => $user,
            'token' => $token,
        ], 'Login berhasil');
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success(null, 'Logout berhasil');
    }

    public function me(Request $request)
    {
        return $this->success($request->user()->load('roles'), 'Profil user');
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name'    => 'string|max:255',
            'no_telp' => 'nullable|string|max:20',
            'foto'    => 'nullable|string|max:255',
        ]);

        $user = $request->user();
        $user->update($request->only(['name', 'no_telp', 'foto']));

        return $this->success($user, 'Profil berhasil diperbarui');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'password_lama' => 'required',
            'password'      => 'required|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->password_lama, $user->password)) {
            return $this->error('Password lama salah', 422);
        }

        $user->update(['password' => Hash::make($request->password)]);

        return $this->success(null, 'Password berhasil diubah');
    }
}
