<?php

namespace App\Http\Controllers;

use App\Calendar;
use App\Place;
use App\User;
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
        $datas = DB::table('calendars')
        ->select('date','id','members_id','places_id','price')
        ->whereYear('date', $year)
        ->whereMonth('date', $month)
        ->orderBy('date', 'asc')
        ->get();

        $calendars = [];

        $key = 0;
        $compareDate = "0000-00-00";
        foreach($datas as $data){
            $date = $data->date;
            $work = $data;
            $work->place = Place::find($data->places_id)->name;
            $work->member = User::find($data->members_id)->name;
            unset($work->date);
            if($compareDate == $date){
                $key--;
                array_push($calendars[$key]["works"], $work);
            }else{
                array_push( $calendars,[
                    "date"=>$date,
                    "works"=>[],
                ]);
                array_push($calendars[$key]["works"], $work);
            }
            $key++;
            $compareDate = $date;
        }

        foreach($calendars as $index => $calendar){
            while (count($calendars[$index]["works"]) <= 1) {
                array_push($calendars[$index]["works"], [
                    "id"=> 0,
                    "members_id"=> 0,
                    "places_id"=> 0,
                    "price"=> 0
                ]);
            }
        }
        // dd(Place::find(4)->name);
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