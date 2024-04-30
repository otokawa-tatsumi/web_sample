<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use \Illuminate\Session\Middleware\StartSession;
use \Illuminate\View\Middleware\ShareErrorsFromSession;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        apiPrefix: '',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            // APIでセッション管理するために必要なミドルウェアを追加
            AddQueuedCookiesToResponse::class,
            StartSession::class,
            ShareErrorsFromSession::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
