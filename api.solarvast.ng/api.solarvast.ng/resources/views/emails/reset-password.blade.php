@component('mail::message')
# Reset Password Notification

You are receiving this email because we received a password reset request for your account.

@component('mail::button', ['url' => env('FRONTEND_URL') . '/reset-password?token=' . $token . '&email=' . urlencode($email)])
Reset Password
@endcomponent

This password reset link will expire in 24 hours.

If you did not request a password reset, no further action is required.

Thanks,
{{ config('app.name') }}
@endcomponent
