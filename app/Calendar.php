<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = [
        'date',
        'price',
        'members_id',
        'places_id',
    ];

    

    // protected $table = 'calendars';
}
