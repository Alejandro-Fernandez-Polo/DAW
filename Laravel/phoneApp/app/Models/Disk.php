<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disk extends Model
{
    use HasFactory;

    protected $table = 'disk';
    
    protected $fillable = ['idartist', 'title', 'year', 'cover'];
    
    public function artist() {
        return $this->belongsTo('App\Models\Artist', 'idartist');
    }
}

