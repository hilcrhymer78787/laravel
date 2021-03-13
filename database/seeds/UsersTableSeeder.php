<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => '名前' . $i,
                'email' => 'email' . $i . '@gmail.com',
                'password' => 'password' . $i,
                'salary' => $i*1000,
            ]);
        }
    }
}
