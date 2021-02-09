<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', 'UserController@index');
Route::post('/users', 'UserController@store');
Route::get('/users/{user}', 'UserController@show');
Route::put('/users/{user}', 'UserController@update');
Route::delete('/users/{user}', 'UserController@destroy');

Route::get('/calendars', 'CalendarController@index');
Route::post('/calendars', 'CalendarController@hoge');
// Route::post('/calendars/{year}/{month}/{day}', 'CalendarController@store');
Route::get('/calendars/{year}/{month}', 'CalendarController@show');
Route::put('/calendars/{calendar}', 'CalendarController@update');
Route::delete('/calendars/{calendar}', 'CalendarController@destroy');

