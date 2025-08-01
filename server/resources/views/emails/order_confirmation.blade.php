<!DOCTYPE html>
<html>
<head>
    <title>Order Confirmation</title>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto;">
       {{-- <img src="{{ env('FRONTEND_URL') . '/blog/assets/images/logo/email_logo.png' }}" alt="Company Logo" style="max-width: 200px;"> --}}

        <h2>Order Confirmation</h2>
        <p>Dear {{ $fullName }},</p>
        <p>Thank you for your order. Your order number is <strong>{{ $orderNumber }}</strong>.</p>
        <p>We will process your order soon and keep you updated on its status.</p>
        <p>Best regards,<br>Solarvast</p>
    </div>
</body>
</html>
