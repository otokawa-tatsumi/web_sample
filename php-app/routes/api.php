<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Middleware\AuthenticateApi;
use App\Http\Controllers\MainController;

Route::post('/login', [LoginController::class, 'login']);
Route::middleware([AuthenticateApi::class])->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/main', [MainController::class, 'main']);
});
