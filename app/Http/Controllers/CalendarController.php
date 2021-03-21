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

    public function store(Request $request)
    {
        foreach($request["works"] as $work){
            $calendar = new Calendar;
            $calendar->date = $request["date"];
            $calendar->price = $work["price"];
            $calendar->members_id = $work["members_id"];
            $calendar->places_id = $work["places_id"];
            if($work["id"] == 0){
                $calendar->save();
            }else{
                // $calendars = DB::table('calendars')
                // ->where('id', $work["id"])
                // ->update($calendar);
                // return compact('calendars');
            }
        }
        return $calendar;
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