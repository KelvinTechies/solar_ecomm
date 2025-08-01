<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminOrderNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    /**
     * Create a new message instance.
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('New Order Received - ' . $this->order->order_number)
            ->with([
                'order' => $this->order,
                'formattedTotal' => number_format($this->order->total_amount, 2)
            ])
            ->view('emails.admin_order_notification');
    }
}