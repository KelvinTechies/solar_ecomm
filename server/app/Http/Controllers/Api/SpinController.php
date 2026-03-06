<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserSpin;
use App\Models\User;
use App\Models\SpinHistory;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SpinController extends Controller
{
    public function getSpinData($userId)
    {
        $userSpin = UserSpin::firstOrCreate(
            ['user_id' => $userId],
            [
                'total_points' => 0,
                'lucky_day_count' => 0,
                'lucky_day_reset_date' => now(),
            ]
        );

        return response()->json([
            'points' => $userSpin->total_points,
            'last_spin_date' => $userSpin->last_spin_date?->toIso8601String(),
            'lucky_day_count' => $userSpin->lucky_day_count,
            'lucky_day_reset_date' => $userSpin->lucky_day_reset_date?->toDateString(),
            'can_spin' => $userSpin->canSpinToday(),
            'can_get_lucky_day' => $userSpin->canGetLuckyDay(),
        ]);
    }

    public function spin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'spin_result' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Use firstOrCreate to ensure the record exists
        $userSpin = UserSpin::firstOrCreate(
            ['user_id' => $request->user_id],
            [
                'total_points' => 0,
                'lucky_day_count' => 0,
                'lucky_day_reset_date' => now(),
            ]
        );

        if (!$userSpin->canSpinToday()) {
            return response()->json(['error' => 'You can only spin once per day'], 403);
        }

        DB::beginTransaction();
        try {
            $spinResult = $request->spin_result;
            $pointsEarned = 0;

            if ($spinResult === 'Lucky Day') {
                // Check if user can get lucky day
                if (!$userSpin->canGetLuckyDay()) {
                    DB::rollBack();
                    return response()->json([
                        'error' => 'Lucky day limit reached for this month'
                    ], 403);
                }

                $userSpin->lucky_day_count++;
                if (!$userSpin->lucky_day_reset_date) {
                    $userSpin->lucky_day_reset_date = now();
                }
            } else {
                $pointsEarned = (int) $spinResult;
                $userSpin->total_points += $pointsEarned;
            }

            $userSpin->last_spin_date = now();
            $userSpin->save();

            // Record spin history
            SpinHistory::create([
                'user_id' => $request->user_id,
                'spin_result' => $spinResult,
                'points_earned' => $pointsEarned,
                'spin_date' => now(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'spin_result' => $spinResult,
                'points_earned' => $pointsEarned,
                'total_points' => $userSpin->total_points,
                'lucky_day_count' => $userSpin->lucky_day_count,
                'is_lucky_day' => $spinResult === 'Lucky Day',
                'message' => $spinResult === 'Lucky Day' 
                    ? '🎉 Lucky Day! You can withdraw ₦1000!' 
                    : "🎊 You earned {$pointsEarned} points!",
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Spin failed: ' . $e->getMessage()], 500);
        }
    }

    public function withdraw(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'wallet_address' => 'required|string',
            'amount' => 'required|numeric|min:1000',
            'is_lucky_day' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $userSpin = UserSpin::where('user_id', $request->user_id)->first();
        $isLuckyDay = $request->is_lucky_day ?? false;

        // ✅ UPDATED: Validate withdrawal eligibility - NOW REQUIRES 1000 POINTS
        if (!$isLuckyDay && $userSpin->total_points < 1000) {
            return response()->json([
                'error' => 'Insufficient points. You need 1000 points to withdraw.'
            ], 403);
        }

        DB::beginTransaction();
        try {
            // Get user's wallet
            $user = User::find($request->user_id);
            
            // Create withdrawal record
            $withdrawal = Withdrawal::create([
                'user_id' => $request->user_id,
                'amount' => $request->amount,
                'wallet_address' => 'IN_APP_WALLET',
                'is_lucky_day' => $isLuckyDay,
                'status' => 'pending',
            ]);

            // Credit user's in-app wallet
            $user->wallet_balance = ($user->wallet_balance ?? 0) + $request->amount;
            $user->save();

            // Update withdrawal status
            $withdrawal->status = 'completed';
            $withdrawal->save();

            // Reset user points after successful withdrawal
            $userSpin->resetAfterWithdrawal();

            // Create wallet transaction record
            DB::table('wallet_transactions')->insert([
                'user_id' => $request->user_id,
                'type' => 'credit',
                'amount' => $request->amount,
                'description' => $isLuckyDay ? 'Spin Wheel - Lucky Day Bonus' : 'Spin Wheel - Points Withdrawal',
                'balance_after' => $user->wallet_balance,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Amount credited to wallet successfully',
                'withdrawal_id' => $withdrawal->id,
                'amount' => $withdrawal->amount,
                'new_wallet_balance' => $user->wallet_balance,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Withdrawal failed: ' . $e->getMessage()], 500);
        }
    }

    public function getSpinHistory($userId)
    {
        $history = SpinHistory::where('user_id', $userId)
            ->orderBy('spin_date', 'desc')
            ->take(30)
            ->get();

        return response()->json($history);
    }

    public function getWithdrawalHistory($userId)
    {
        $withdrawals = Withdrawal::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($withdrawals);
    }
}
?>