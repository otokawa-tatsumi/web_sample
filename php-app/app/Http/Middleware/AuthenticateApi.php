<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class AuthenticateApi
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // セッションにユーザー名がない場合はエラーを返す
        Log::info('Session content:', $request->session()->all());
        if (!$request->session()->has('key')) {
            return response()->json(['message' => 'Not authenticated'], 401);
        }

        return $next($request);
    }
}
