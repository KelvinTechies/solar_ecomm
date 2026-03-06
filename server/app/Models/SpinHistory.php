<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpinHistory extends Model
{
    protected $table = 'spin_history';
    
    protected $fillable = [
        'user_id',
        'spin_result',
        'points_earned',
        'spin_date',
    ];

    protected $casts = [
        'spin_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

?>