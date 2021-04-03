<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Auth;

class UserController extends Controller
{
    public function loginuser()
    {
        $loginuser = Auth::user();
        return compact('loginuser');
    }
    public function index()
    {
        return User::all();
    }

    // \Hash::make('Zxcasdqwe1')
    public function show(User $user)
    {
        return $user;
    }
    public function store(Request $request)
    {
        return User::create($request->all());
    }
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        return $user;
    }
    public function destroy(User $user)
    {
        $user->delete();
        return $user;
    }
}