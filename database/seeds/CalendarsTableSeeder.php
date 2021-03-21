<?php

use Illuminate\Database\Seeder;

class CalendarsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 20; $i++) {
            DB::table('calendars')->insert([
                'date' => '2021/03/'.$i,
                'price' => 1000,
                'members_id' => 1,
                'places_id' => 1,
            ]);
        }
    }
}
