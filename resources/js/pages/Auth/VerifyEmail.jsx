import { useForm } from '@inertiajs/react'

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <div>
            <h1>Email Verification</h1>

            {status === 'verification-link-sent' && (
                <p className="text-green-600">
                    A new verification link has been sent to your email address.
                </p>
            )}

            <p>
                Thanks for signing up! Before getting started, please verify your email by clicking on
                the link we just emailed to you. If you didn’t receive the email, we will gladly send you another.
            </p>

            <form onSubmit={submit}>
                <button disabled={processing}>Resend Verification Email</button>
            </form>
        </div>
    );
}
