<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class SocialAuthController extends Controller
{
    /**
     * Handle Apple Sign-In.
     *
     * Finds an existing user by apple_id (or email) and returns a token,
     * or creates a new user account if none exists.
     *
     * POST /api/auth/apple
     * Body: { apple_id, name, email?, identity_token? }
     */
    public function appleLogin(Request $request)
    {
        $request->validate([
            'apple_id'       => 'required|string|max:255',
            'name'           => 'nullable|string|max:255',
            'email'          => 'nullable|email|max:255',
            'identity_token' => 'nullable|string',
        ]);

        $appleId = $request->apple_id;
        $name    = $request->filled('name') ? $request->name : 'Apple User';
        $email   = $request->email;

        // 1. Find by apple_id (repeat sign-ins)
        $user = User::where('apple_id', $appleId)->first();

        // 2. Find by email and link apple_id (user previously signed up with email)
        if (!$user && $email) {
            $user = User::where('email', $email)->first();
            if ($user) {
                $user->apple_id = $appleId;
                $user->save();
            }
        }

        // 3. Create a brand-new account
        if (!$user) {
            // Apple hides real email after first sign-in; use a placeholder if needed
            $userEmail = $email ?: ($appleId . '@apple-private.solarvast.com');

            $user = User::create([
                'name'              => $name,
                'email'             => $userEmail,
                'apple_id'          => $appleId,
                'password'          => Hash::make(Str::uuid()), // random, unusable password
                'email_verified_at' => now(),                   // skip OTP for Apple users
            ]);
        }

        // Revoke any old Apple tokens, then issue a fresh one
        $user->tokens()->where('name', 'apple-auth')->delete();
        $token = $user->createToken('apple-auth')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'data'   => [
                'token' => $token,
                'user'  => $user,
            ],
        ], 200);
    }
}
