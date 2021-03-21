<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = [
        'date',
        'price',
        'members_id',
    ];

    

    // protected $table = 'calendars';
}
