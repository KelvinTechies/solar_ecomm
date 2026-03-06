<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use App\Mail\MobileOTP;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    // User Registration
    public function register(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|confirmed',
                'password_confirmation' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

 
            $otp = $this->sendOtp($user->id);
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed',
                //'error' => $e->getMessage()
                'error'=>"An error occured"
            ], 500);
        }
    }

    // User Login
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer'
            ]
        ]);
    }

    // User Logout
        public function logout(Request $request): JsonResponse
        {
            $request->user()->tokens()->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully'
            ]);
        }
        
           public function AllUsers(): JsonResponse
        {
            $users = User::all();

            return response()->json([
                'status' => 'success',
                'users' => $users
            ]);
        }

    // Get Authenticated User
    public function user(): JsonResponse
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'data' => Auth::user()
        ]);
    }


    public function update(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
                'current_password' => 'required_with:password|string',
                'password' => 'sometimes|string|confirmed',
                'phone_number' => 'sometimes',
                'address' => 'sometimes',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check current password if trying to change password
            if (
                $request->has('password') &&
                !Hash::check($request->current_password, $user->password)
            ) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Current password is incorrect'
                ], 422);
            }

            $updateData = array_filter([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password ? Hash::make($request->password) : null,
 'phone_number' => $request->phone_number ?? null,
    'address' => $request->address ?? null,
                
            ]);

            $user->update($updateData);

            return response()->json([
                'status' => 'success',
                'message' => 'User updated successfully',
                'data' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    // Delete User
    public function delete(): JsonResponse
    {
        $user = Auth::user();
        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully'
        ]);
    }

    public function forgotPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email'
            ]);

            // Generate random token
            $token = Str::random(64);

            // Store token in password_resets table
            DB::table('password_resets')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);

            // Send password reset email
            Mail::to($request->email)->send(new ResetPasswordMail([
                'token' => $token,
                'email' => $request->email
            ]));

            return response()->json([
                'status' => 'success',
                'message' => 'Password reset link sent to your email'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email not found in our records',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send reset link',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users',
                'password' => 'required|string|confirmed',
                'password_confirmation' => 'required',
                'token' => 'required|string'
            ]);

            // Verify token and get reset record
            $passwordReset = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

            if (!$passwordReset) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid token'
                ], 422);
            }

            // Check if token is expired (24 hours)
            $createdAt = Carbon::parse($passwordReset->created_at);
            if ($createdAt->addHours(24)->isPast()) {
                DB::table('password_resets')
                ->where('email', $request->email)
                ->delete();

                return response()->json([
                    'status' => 'error',
                    'message' => 'Token has expired'
                ], 422);
            }

            // Update user's password
            $user = User::where('email', $request->email)->first();
            $user->password = Hash::make($request->password);
            $user->save();

            // Delete the reset record
            DB::table('password_resets')
            ->where('email', $request->email)
            ->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Password has been reset successfully'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to reset password',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    
private function sendOtp($userId): string
{
    // Generate a 6-digit OTP (matching your validation)
    $otp = str_pad(random_int(1000, 9999), 4, '0', STR_PAD_LEFT);
    
    // Store OTP in database or cache
    \Illuminate\Support\Facades\Cache::put("otp_user_{$userId}", $otp, now()->addMinutes(10));
    
    // Get user
    $user = User::findOrFail($userId);
    
    try {
        // Send OTP via email - Check if OtpVerificationMail class exists
        if (class_exists('\App\Mail\OtpVerificationMail')) {
            \Illuminate\Support\Facades\Mail::to($user->email)
                ->send(new \App\Mail\OtpVerificationMail($user, $otp));
        } else {
            // Fallback: Send OTP using raw email
            \Illuminate\Support\Facades\Mail::raw("Your OTP verification code is: {$otp}", function ($message) use ($user) {
                $message->to($user->email)
                       ->subject('Email Verification OTP');
            });
        }
        
        // Remove or comment out the test email
        // Mail::raw('Test email from SolarVast', function ($message) {
        //     $message->to('iamkelvincole@gmail.com')
        //            ->subject('Test Email');
        // });
        
        // Log successful email sending
        \Illuminate\Support\Facades\Log::info('OTP email sent successfully', [
            'user_id' => $userId,
            'email' => $user->email,
            'otp' => $otp // Remove this in production for security
        ]);
        
    } catch (\Exception $e) {
        // Log email sending failure
        \Illuminate\Support\Facades\Log::error('Failed to send OTP email', [
            'user_id' => $userId,
            'email' => $user->email,
            'error' => $e->getMessage()
        ]);
        
        // Don't throw exception here to avoid breaking registration
    }
    
    return $otp;
}
    
    public function verifyOtp(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|integer|exists:users,id',
                'otp' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = $request->user_id;
            $inputOtp = $request->otp;
            
            // Get stored OTP from cache
            $storedOtp = \Illuminate\Support\Facades\Cache::get("otp_user_{$userId}");

            if (!$storedOtp) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'OTP expired or not found'
                ], 404);
            }

            if ($storedOtp !== $inputOtp) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid OTP'
                ], 400);
            }

            // Mark email as verified
            $user = User::findOrFail($userId);
            $user->email_verified_at = now();
            $user->save();

            // Remove OTP from cache
            \Illuminate\Support\Facades\Cache::forget("otp_user_{$userId}");

            return response()->json([
                'status' => 'success',
                'message' => 'Email verified successfully',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'email_verified_at' => $user->email_verified_at,
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('OTP verification failed', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'OTP verification failed',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    /**
     * Resend OTP
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function resendOtp(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|integer|exists:users,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = $request->user_id;
            $user = User::findOrFail($userId);

            // Check if email is already verified
            if ($user->email_verified_at) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email is already verified'
                ], 400);
            }

            // Generate new OTP
            $otp = $this->sendOtp($userId);

            return response()->json([
                'status' => 'success',
                'message' => 'OTP resent successfully',
                'data' => [
                  
                ]
            ], 200);

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Resend OTP failed', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to resend OTP',
                'error' => 'An error occurred'
            ], 500);
        }
    }

// For Mobile

public function MobileForgotPassword(Request $request)
{
    try {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        // Generate random 6-digit OTP
        $token = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Store OTP in password_resets table or create a custom table
        DB::table('password_reset_otps')->updateOrInsert(
            ['email' => $request->email],
            [
                'email' => $request->email,
                'otp' => $token,
                'created_at' => Carbon::now(),
                'expires_at' => Carbon::now()->addMinutes(10), // OTP expires in 10 minutes
            ]
        );
        
        // Send password reset email with OTP
        Mail::to($request->email)->send(new MobileOTP([
            'token' => $token,
            'email' => $request->email
        ]));

        return response()->json([
            'status' => 'success',
            'message' => 'An OTP was sent to your email'
        ]);
    } catch (ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Email not found in our records',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to send reset OTP',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Verify OTP for password reset
 */
public function MobileVerifyResetOtp(Request $request)
{
    try {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6'
        ]);

        // Check if OTP exists and is not expired
        $resetRecord = DB::table('password_reset_otps')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$resetRecord) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired OTP'
            ], 422);
        }

        // Mark OTP as verified (optional - add verified_at column)
        DB::table('password_reset_otps')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->update(['verified_at' => Carbon::now()]);

        return response()->json([
            'status' => 'success',
            'message' => 'OTP verified successfully',
            'data' => [
                'email' => $request->email,
                'verified' => true
            ]
        ]);

    } catch (ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'OTP verification failed',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Reset password using OTP
 */
public function MobileResetPassword(Request $request)
{
    try {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6',
            'password' => 'required|string|min:8|confirmed'
        ]);

        // Verify OTP is valid and not expired
        $resetRecord = DB::table('password_reset_otps')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$resetRecord) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired OTP'
            ], 422);
        }

        // Find the user and update password
        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        // Update user password
        $user->password = Hash::make($request->password);
        $user->save();

        // Delete the used OTP record
        DB::table('password_reset_otps')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->delete();

        // Optional: Revoke all existing tokens for security
        $user->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Password reset successfully'
        ]);

    } catch (ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Password reset failed',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Resend OTP for password reset
 */
public function MobileResendResetOtp(Request $request)
{
    try {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        // Check if user hasn't requested too many OTPs recently (rate limiting)
        $recentOtp = DB::table('password_reset_otps')
            ->where('email', $request->email)
            ->where('created_at', '>', Carbon::now()->subMinutes(2))
            ->first();

        if ($recentOtp) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please wait 2 minutes before requesting another OTP'
            ], 429);
        }

        // Generate new OTP
        $token = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Update or insert new OTP
        DB::table('password_reset_otps')->updateOrInsert(
            ['email' => $request->email],
            [
                'email' => $request->email,
                'otp' => $token,
                'created_at' => Carbon::now(),
                'expires_at' => Carbon::now()->addMinutes(10),
                'verified_at' => null // Reset verification status
            ]
        );
        
        // Send new OTP
        Mail::to($request->email)->send(new MobileOTP([
            'token' => $token,
            'email' => $request->email
        ]));

        return response()->json([
            'status' => 'success',
            'message' => 'New OTP sent to your email'
        ]);

    } catch (ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Email not found in our records',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to resend OTP',
            'error' => $e->getMessage()
        ], 500);
    }
    
}

public function deleteByEmail(Request $request): JsonResponse
{
    try {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        // Delete all user tokens
        $user->tokens()->delete();
        
        // Delete the user
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Account deleted successfully'
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to delete account',
            'error' => $e->getMessage()
        ], 500);
    }
}
}