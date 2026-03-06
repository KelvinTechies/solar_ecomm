@component('mail::message')
# Order Status Update

Hello {{ $customerName }},

Your order **{{ $orderNumber }}** status has been updated to **{{ $status }}**.

@component('mail::panel')
Order Details:
- Order Number: {{ $orderNumber }}
- Current Status: {{ $status }}
@endcomponent

Thank you for your patience.

{{-- @component('mail::button', ['url' => config('app.url') . '/orders/' . $orderNumber])
View Order Details
@endcomponent --}}

@endcomponent
