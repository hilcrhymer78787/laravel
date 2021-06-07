<?php

namespace App\Http\Controllers;

use App\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PlaceController extends Controller
{
    public function index()
    {
        return Place::all();
    }

    public function update(Request $request, Place $place)
    {
        if(isset($request->id)){
            if(isset($request->file)){
                $request->file->storeAs('public/', $request->img_name);
                Storage::delete('public/' . $request->img_oldname);
                $place->where("id", $request->id)->update([
                    "img_name" => $request->img_name,
                ]);
            }

            $place->where("id", $request->id)->update([
                "name" => $request->name,
                "tel" => $request->tel,
                "address" => $request->address,
            ]);
        }else{
            if(isset($request->file)){
                $request->file->storeAs('public/', $request->img_name);
                $place["img_name"] = $request->img_name;
            }
            $place["name"] = $request->name;
            $place["tel"] = $request->tel;
            $place["address"] = $request->address;
            $place->save();
        };
    }
    public function destroy(Place $place)
    {
        Storage::delete('public/' . $place->img_name);
        $place->delete();
    }
}