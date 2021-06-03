<?php

use App\Calendar;
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
        factory(Calendar::class, 300)->create();
    }
}
