<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public const HOME = '/dashboard';
    public function boot(): void
    {
        Fortify::verifyEmailView(function () {
            return Inertia::render('Auth/VerifyEmail');
        });
    }
}
