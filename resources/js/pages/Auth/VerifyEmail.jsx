import React from 'react';
import { Link } from '@inertiajs/react';

export default function VerifyEmail() {
    return (
        <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Verify your email</h1>
            <p className="mt-4 text-gray-600">
                Please check your inbox for a verification link.
            </p>
            <p className="mt-2">
                Didn’t get it?{' '}
                <Link
                    href="/email/verification-notification"
                    method="post"
                    as="button"
                    className="text-blue-600 underline"
                >
                    Resend link
                </Link>
            </p>
        </div>
    );
}