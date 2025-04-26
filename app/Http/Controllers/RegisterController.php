<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Fortify\Http\Requests\RegisterRequest;

class RegisterController extends Controller
{
    protected $creator;

    public function __construct(CreatesNewUsers $creator)
    {
        $this->creator = $creator;
    }

    public function show()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(RegisterRequest $request)
    {
        // Create user via Fortify's built-in method
        $user = $this->creator->create($request->validated());

        // Log the registration information
        Log::info('User registered', [
            'user_id' => $user->id,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at,
        ]);

        // Log in the new user after creation
        Auth::login($user);

        // Redirect to the email verification notice
        return redirect()->route('verification.notice');
    }
}
