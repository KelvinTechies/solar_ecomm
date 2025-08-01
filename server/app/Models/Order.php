<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'full_name',
        'email',
        'phone',
        'address',
        'payment_proof',
        'status',
        'quantity',
        'total_amount',
        'customMessage'
    ];

}