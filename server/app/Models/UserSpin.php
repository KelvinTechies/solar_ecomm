<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSpin extends Model
{
    protected $fillable = [
        'user_id',
        'total_points',
        'last_spin_date',
        'lucky_day_count',
        'lucky_day_reset_date',
    ];

    protected $casts = [
        'last_spin_date' => 'datetime',
        'lucky_day_reset_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

 public function canSpinToday()
{
    if (!$this->last_spin_date) {
        return true;
    }

    // Clone last_spin_date before modifying it
    $nextAllowedSpin = $this->last_spin_date->copy()->addDay();
    return now()->greaterThanOrEqualTo($nextAllowedSpin);
    //     $nextAllowedSpin = $this->last_spin_date->copy()->addMinute();
    // return now()->greaterThanOrEqualTo($nextAllowedSpin);
}


    public function canGetLuckyDay()
    {
        // Reset lucky day count if new month
        if ($this->lucky_day_reset_date) {
            if (now()->month != $this->lucky_day_reset_date->month || 
                now()->year != $this->lucky_day_reset_date->year) {
                $this->lucky_day_count = 0;
                $this->lucky_day_reset_date = now();
                $this->save();
            }
        }
        return $this->lucky_day_count < 2;
    }

    public function resetAfterWithdrawal()
    {
        $this->total_points = 0;
        $this->last_spin_date = now()->subDay(); // Allow spin after 24 hours
        $this->save();
    }
}



?>