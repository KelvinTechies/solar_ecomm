<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        // 'description',
        'filename',
        'path',
        'url',
        'size',
        'mime_type'
    ];

    protected $appends = [
        'full_url',
        'formatted_size'
    ];

    public function getFullUrlAttribute()
    {
        // For your domain: https://api.solarvast.ng/images/filename.jpg
        return url($this->url);
    }

    public function getFormattedSizeAttribute()
    {
        $bytes = $this->size;
        if ($bytes === 0) return '0 Bytes';
        
        $k = 1024;
        $sizes = ['Bytes', 'KB', 'MB', 'GB'];
        $i = floor(log($bytes) / log($k));
        
        return round(($bytes / pow($k, $i)), 2) . ' ' . $sizes[$i];
    }
}