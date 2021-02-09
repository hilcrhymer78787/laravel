<?php

namespace App\Http\Controllers;

use App\Calendar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CalendarController extends Controller
{
    public function index()
    {
        return Calendar::all();
    }

    public function hoge(Request $request)
    {
        if($request->input('id') == 0){
            $calendar = new Calendar;
            $calendar->year = $request->input('year');
            $calendar->month = $request->input('month');
            $calendar->day = $request->input('day');
            $calendar->price = $request->input('price');
            $calendar->members_id = $request->input('members_id');
            $calendar->save();
        }else{
            $calendars = DB::table('calendars')
            ->where('id', $request->input('id'))
            ->update($request->all());
            return compact('calendars');
        }
    }

    public function show($year,$month)
    {
        $calendars = DB::table('calendars')
        ->select('id','year','month','day','members_id','price')
        ->where('year', $year)
        ->where('month', $month)
        ->get();

        return compact('calendars');
    }

    // public function update(Request $request, Calendar $calendar)
    // {
    //     $calendar->update($request->all());
    //     return $calendar;
    // }
    // public function destroy(Calendar $calendar)
    // {
    //     $calendar->delete();
    //     return $calendar;
    // }
}