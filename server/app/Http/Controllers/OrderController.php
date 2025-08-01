<?php

namespace App\Http\Controllers;

use App\Mail\AdminOrderNotification;
use App\Models\Order;
use App\Mail\OrderConfirmation;
use App\Mail\OrderStatusUpdateMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string',
            'quantity' => 'required|string',
            'address' => 'required|string',
            'customMessage' => 'nullable|string|max:255', 
            'paymentProof' => 'required|file|mimes:pdf,jpg,jpeg,png|max:15120',
            'totalAmount' => 'required|numeric|min:0'
        ]);

        // Generate unique order number
        $orderNumber = 'ORD-' . Str::random(8);

        // Store payment proof in the 'public/uploads/orders' folder
        $imageUrl = null;
        if ($request->hasFile('paymentProof')) {
            $image = $request->file('paymentProof');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/orders'), $imageName);
            $imageUrl = asset('uploads/orders/' . $imageName); // ✅ Generate full image URL
        }

        // Create order
        $order = Order::create([
            'order_number' => $orderNumber,
            'full_name' => $validatedData['fullName'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'quantity' => $validatedData['quantity'],
            'address' => $validatedData['address'],
            'customMessage' => $validatedData['customMessage'],
            'payment_proof' => $imageUrl, // ✅ Save full image URL
            'total_amount' => $validatedData['totalAmount'], 
            'status' => 'pending'
        ]);

        // Send confirmation email
        \Log::info($order);
        $adminEmail = "odusoviasuyi@gmail.com"; // Replace with actual admin email
        Mail::to($adminEmail)->send(new AdminOrderNotification($order));
        Mail::to($order->email)->send(new OrderConfirmation($order));

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order
        ], 201);
    }


    public function index()
    {
        $orders = Order::all();

        return response()->json([
            'orders' => $orders
        ]);
    }


    public function updateStatus(Request $request, $id)
    {
        // Add validation
        $request->validate([
            'status' => 'required|in:pending,processing,delivered,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        // Send email notification
        Mail::to($request->email)->send(
            new OrderStatusUpdateMail($order)
        );

        return response()->json([
            'status' => 'success',
            'data' => $order
        ]);
    }

    public function track(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'order_number' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid order number',
                'errors' => $validator->errors()
            ], 422);
        }

        // Find the order
        $order = Order::where('order_number', $request->order_number)->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }

        // Return tracking information
        return response()->json([
            'status' => $order->status,
            'order_date' => $order->created_at->format('Y-m-d H:i:s'),
            'current_location' => $order->address,
            'full_name' => $order->full_name
        ]);
    }
}