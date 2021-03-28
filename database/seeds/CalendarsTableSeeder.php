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
        for ($i = 1; $i <= 20; $i = $i + 2) {
            DB::table('calendars')->insert([
                'date' => '2021/03/'.$i,
                'price' => 3000,
                'members_id' => 3,
                'places_id' => 3,
            ]);
        }
        for ($i = 1; $i <= 20; $i = $i + 2) {
            DB::table('calendars')->insert([
                'date' => '2021/03/'.$i,
                'price' => 4000,
                'members_id' => 4,
                'places_id' => 4,
            ]);
        }
        for ($i = 1; $i <= 20; $i = $i + 4) {
            DB::table('calendars')->insert([
                'date' => '2021/03/'.$i,
                'price' => 5000,
                'members_id' => 5,
                'places_id' => 5,
            ]);
        }
        for ($i = 1; $i <= 20; $i++) {
            DB::table('calendars')->insert([
                'date' => '2021/04/'.$i,
                'price' => 1000,
                'members_id' => 1,
                'places_id' => 1,
            ]);
        }
    }
}
