<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = [
        'year',
        'month',
        'day',
        'price',
        'members_id',
    ];

    

    // protected $table = 'calendars';
}
