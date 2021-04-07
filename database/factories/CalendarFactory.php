<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Calendar;
use Faker\Generator as Faker;

$factory->define(Calendar::class, function (Faker $faker) {
    return [
        'date' => $faker->dateTimeBetween($startDate = '-2 week', $endDate = '+20 week'),
        'price' => 10000,
        'members_id' => $faker->numberBetween(1,30),
        'places_id' => $faker->numberBetween(1,30),
    ];
});
