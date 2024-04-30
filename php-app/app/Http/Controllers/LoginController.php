<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (!Auth::attempt(['username' => $credentials['username'], 'password' => $credentials['password']])) {
            return response('Login failed', 401);
        }

        $request->session()->put('key', $credentials['username']);
        return response('Login successful', 200);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('key');

        return response('Logout successful', 200);
    }
}