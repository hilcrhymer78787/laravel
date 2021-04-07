<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Place;
use Faker\Generator as Faker;

$factory->define(Place::class, function (Faker $faker) {
    return [
        'name' => $faker->company(),
        'address' => $faker->address(),
        'tel' => $faker->phoneNumber(),
    ];
});
