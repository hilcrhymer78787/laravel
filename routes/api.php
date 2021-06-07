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
Route::post('/usersUpdate', 'UserController@update');
Route::delete('/users/{user}', 'UserController@destroy');


Route::get('/places', 'PlaceController@index');
Route::post('/places', 'PlaceController@store');
Route::post('/placesUpdate', 'PlaceController@update');
Route::delete('/places/{place}', 'PlaceController@destroy');


Route::get('/calendars', 'CalendarController@index');
Route::post('/calendars', 'CalendarController@store');
Route::get('/calendars/{year}/{month}', 'CalendarController@show');
Route::put('/calendars/{calendar}', 'CalendarController@update');
Route::delete('/calendars/{date}', 'CalendarController@destroy');


Route::get('/search', 'CalendarController@search');