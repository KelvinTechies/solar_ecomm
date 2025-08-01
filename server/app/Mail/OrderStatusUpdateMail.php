<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdateMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->subject('Your Order Status Update')
            ->markdown('emails.order_status_update', [
                'orderNumber' => $this->order->order_number,
                'status' => $this->order->status,
                'customerName' => $this->order->full_name
            ]);
    }
}