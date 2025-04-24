<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser as FortifyCreateNewUser;
use App\Actions\Fortify\ResetUserPassword as FortifyResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword as FortifyUpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation as FortifyUpdateUserProfileInformation;
use App\Responses\VerifyEmailInertiaResponse;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Fortify\Actions\CreateNewUser;
use Laravel\Fortify\Actions\ResetUserPassword;
use Laravel\Fortify\Actions\UpdateUserPassword;
use Laravel\Fortify\Actions\UpdateUserProfileInformation;
use Laravel\Fortify\Contracts\VerifyEmailViewResponse;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Fortify::createUsersUsing(FortifyCreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(FortifyUpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(FortifyUpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(FortifyResetUserPassword::class);

        // Enable email verification
        Features::emailVerification();

        // Rate limiting for login and two-factor
        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());
            return Limit::perMinute(5)->by($throttleKey);
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        // Bind the custom Inertia response for email verification
        $this->app->singleton(VerifyEmailViewResponse::class, function () {
            return new VerifyEmailInertiaResponse();
        });
    }
}