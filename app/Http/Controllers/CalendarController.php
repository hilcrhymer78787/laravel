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
        $calendars = Calendar::orderBy('date', 'asc')
        ->get();

        foreach($calendars as $calendar){
            $date = $calendar->date;
            if(isset(Place::find($calendar->places_id)->name)){
                $calendar->place = Place::find($calendar->places_id)->name;
            }else{
                $calendar->place = "（削除済）";
            }
            if(isset(User::find($calendar->members_id)->name)){
                $calendar->member = User::find($calendar->members_id)->name;
            }else{
                $calendar->member = "（削除済）";
            }
        }

        return $calendars;
    }

    public function store(Request $request)
    {
        $calendars = Calendar::where('date', $request["date"])
        ->delete();
        foreach($request["works"] as $work){
            $calendar = new Calendar;
            $calendar["date"] = $request["date"];
            $calendar["price"] = $work["price"];
            $calendar["members_id"] = $work["members_id"];
            $calendar["places_id"] = $work["places_id"];
            $calendar->save();
        }
    }
    
    public function show($year,$month)
    {
        $datas = Calendar::select('date','id','members_id','places_id','price')
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
            if(isset(Place::find($data->places_id)->name)){
                $work->place = Place::find($data->places_id)->name;
            }else{
                $work->place = "（削除済）";
            }
            if(isset(User::find($data->members_id)->name)){
                $work->member = User::find($data->members_id)->name;
            }else{
                $work->member = "（削除済）";
            }
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
        return compact('calendars');
    }
    
    public function destroy($date)
    {
        Calendar::where('date', $date)
        ->delete();
    }
    
}