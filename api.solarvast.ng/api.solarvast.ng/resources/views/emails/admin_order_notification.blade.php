<!DOCTYPE html>
<html>
<head>
    <title>New Order Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            background: #007bff;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 5px;
        }
        .details {
            padding: 20px;
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #555;
        }
        .highlight {
            font-weight: bold;
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Order Received</h2>
        <div class="details">
            <p><strong>Order Number:</strong> <span class="highlight">{{ $order->order_number }}</span></p>
            <p><strong>Name:</strong> {{ $order->full_name }}</p>
            <p><strong>Email:</strong> {{ $order->email }}</p>
            <p><strong>Phone:</strong> {{ $order->phone }}</p>
            <p><strong>Address:</strong> {{ $order->address }}</p>
            <p><strong>Quantity:</strong> {{ $order->quantity }}</p>
            <p><strong>Total Amount:</strong> <span class="highlight">₦{{ $formattedTotal }}</span></p>

            @if($order->customMessage)
                <p><strong>Message:</strong> {{ $order->customMessage }}</p>
            @endif
            <p><strong>Payment Proof:</strong> <a href="{{ $order->payment_proof}}" target="_blank">View File</a></p>
        </div>
        <div class="footer">
            <p>This is an automated email from your system.</p>
        </div>
    </div>
</body>
</html>
