<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function main(Request $request)
    {
        return response()->json(['message' => 'Welcome, you are authenticated.'], 200);
    }
}
