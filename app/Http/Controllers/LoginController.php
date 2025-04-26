<?php

  namespace App\Http\Controllers;

  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Auth;
  use Inertia\Inertia;

  class LoginController extends Controller
  {
      public function show()
      {
          return Inertia::render('Auth/Login');
      }

      public function store(Request $request)
      {
          $request->validate([
              'email' => 'required|email',
              'password' => 'required',
          ]);

          if (Auth::attempt($request->only('email', 'password'))) {
              $request->session()->regenerate();
              return redirect()->intended(route('home'));
          }

          return back()->withErrors([
              'email' => 'The provided credentials do not match our records.',
          ]);
      }
  }