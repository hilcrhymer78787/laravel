<?php

use App\Place;
use Illuminate\Database\Seeder;

class PlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // for ($i = 1; $i <= 4; $i++) {
        //     DB::table('places')->insert([
        //         'name' => '出勤場所' . $i,
        //         'address' => '東京都港区芝公園４丁目２−' . $i,
        //         'tel' => '0465858000' . $i,
        //     ]);
        // }
        factory(Place::class, 30)->create();

    }
}