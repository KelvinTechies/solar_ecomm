<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //

     protected $fillable = [
        'name',
        'price',
        'description',
        'video_url',
        'image_url',
         'additional_image_urls',
         'needs_memory_card',
         'free_delivery'
    ];

    protected $casts = [
        'additional_image_urls' => 'array',
        'needs_memory_card' => 'boolean', 
        'free_delivery' => 'boolean', 
        
    ];
    
  
}