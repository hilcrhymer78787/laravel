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
        User::create([
            'name' => '今野龍之介',
            'email' => 'test@gmail.com',
            'password' => \Hash::make('test1234'),
            'salary' => 10000,
        ]);
       for ($i = 1; $i <= 4; $i++) {
            User::create([
                'name' => '名前' . $i,
                'email' => 'email' . $i . '@gmail.com',
                'password' => 'password' . $i,
                'salary' => $i*1000,
            ]);
        }
    }
}
