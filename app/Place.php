<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    
    protected $fillable = [
        'name',
        'address',
        'tel',
        'img_name',
    ];
    public function calendars(){
        return $this->hasMany('App\Calendar');
    }
}
