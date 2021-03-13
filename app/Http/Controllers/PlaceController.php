<?php

namespace App\Http\Controllers;

use App\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlaceController extends Controller
{
    public function index()
    {
        return Place::all();
    }

    public function store(Request $request)
    {
        return Place::create($request->all());
    }

    public function show(Place $place)
    {
        return $place;
    }

    public function update(Request $request, Place $place)
    {
        $place->update($request->all());
        return $place;
    }
    
    public function destroy(Place $place)
    {
        $place->delete();
        return $place;
    }
}