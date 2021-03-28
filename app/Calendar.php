<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    // protected $fillable = [
    //     'date',
    //     'members_id',
    //     'places_id',
    //     'price',
    // ];

    // protected $table = 'calendars';

    public function place(){
        return $this -> belongsTo('App\Place');
    }

    public function user(){
        return $this -> belongsTo('App\User');
    }
}
