<?php

  namespace App\Http\Controllers;

  use App\Notifications\VerificationCodeNotification;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Log;
  use Inertia\Inertia;

  class EmailVerificationController extends Controller
  {
      public function show(Request $request)
      {
          return $request->user()->hasVerifiedEmail()
              ? redirect()->intended(route('home'))
              : Inertia::render('Auth/VerifyEmail', [
                  'status' => session('status'),
              ]);
      }

      public function verify(Request $request)
      {
          $request->validate([
              'code' => 'required|string|size:6',
          ]);

          $user = Auth::user();

          if (!$user) {
              Log::error('No authenticated user found during verification');
              return redirect()->route('login');
          }

          if ($user->hasVerifiedEmail()) {
              Log::info('User already verified, redirecting to home');
              return redirect()->route('home');
          }

          if ($user->hasValidVerificationCode($request->code)) {
              $user->markEmailAsVerified();
              Log::info('Email verified successfully', ['user_id' => $user->id]);
              return redirect()->route('home')->with('success', 'Email verified successfully!');
          }

          Log::warning('Invalid verification code', [
              'user_id' => $user->id,
              'submitted_code' => $request->code,
          ]);

          return back()->withErrors([
              'code' => 'The verification code is invalid or has expired.',
          ]);
      }

      public function resend(Request $request)
      {
          $user = Auth::user();

          if (!$user) {
              Log::error('No authenticated user found during resend');
              return redirect()->route('login');
          }

          if ($user->hasVerifiedEmail()) {
              Log::info('User already verified, redirecting to home');
              return redirect()->route('home');
          }

          $verificationCode = (string) random_int(100000, 999999);
          $user->forceFill([
              'verification_code' => $verificationCode,
              'verification_code_expires_at' => now()->addMinutes(60),
          ])->save();

          $user->notify(new VerificationCodeNotification($verificationCode));

          Log::info('Verification code resent', ['user_id' => $user->id]);

          return back()->with('status', 'verification-code-sent');
      }
  }