<?php

namespace App\Responses;

use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Contracts\VerifyEmailViewResponse;

class VerifyEmailInertiaResponse implements VerifyEmailViewResponse
{
    public function toResponse($request): Response
    {
        return Inertia::render('Auth/VerifyEmail');
    }
}