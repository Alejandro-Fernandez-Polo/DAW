<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Argo extends Model
{
    use HasFactory;
    
    protected $table = 'argo';

    public $timestamps = false;
    
    protected $fillable = ['name'];
    
    function artists () {
        return $this->hasMany('App\Models\Artist', 'idargo');
    }

}
