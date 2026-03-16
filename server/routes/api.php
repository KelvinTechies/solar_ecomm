<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\SocialAuthController;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Api\SpinController;




// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/test-mail', function () {
    try {
        Mail::raw('Test email from SolarVast', function ($message) {
            $message->to('lvinzamani@gmail.com')
                   ->subject('Test Email');
        });
        return 'Email sent successfully!';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});

Route::post('/register', [ AuthController::class, 'register']);
Route::post('/login', [ AuthController::class, 'login']);
Route::post('/auth/apple', [SocialAuthController::class, 'appleLogin']);
Route::post('/track-order', [ OrderController::class, 'track']);
Route::get('/users', [ AuthController::class, 'AllUsers']);


Route::post('/auth/delete-by-email', [AuthController::class, 'deleteByEmail']);


// Mobile
Route::post('/mobile-forgot-password', [AuthController::class, 'MobileForgotPassword']);
Route::post('/mobile_verify-reset-otp', [AuthController::class, 'MobileVerifyResetOtp']);
Route::post('/mobile_reset-password', [AuthController::class, 'MobileResetPassword']);
Route::post('/mobile_resend-reset-otp', [AuthController::class, 'MobileResendResetOtp']);




 Route::get('/user/spin-data/{userId}', [SpinController::class, 'getSpinData']);
    Route::post('/user/spin', [SpinController::class, 'spin']);
    Route::post('/user/withdraw', [SpinController::class, 'withdraw']);
    Route::get('/user/spin-history/{userId}', [SpinController::class, 'getSpinHistory']);
    Route::get('/user/withdrawal-history/{userId}', [SpinController::class, 'getWithdrawalHistory']);


Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp']);

Route::get('/accounts', [AccountController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
    Route::get('/images', [ImageController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);
Route::post('/order', [OrderController::class, 'store']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);
Route::middleware('auth:sanctum')->group(function () {
     Route::post('/chat/token', [ChatController::class, 'generateToken']);
    Route::post('/chat/channel', [ChatController::class, 'createChannel']);
      
    Route::post('/accounts', [AccountController::class, 'store']);
Route::get('/accounts/{id}', [AccountController::class, 'show']);
Route::put('/accounts/{id}', [AccountController::class, 'update']);
Route::delete('/accounts/{id}', [AccountController::class, 'destroy']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/product/{id}', [ProductController::class, 'update']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/order/{id}', [OrderController::class,
    'updateStatus']);
    Route::post('/user/update', [AuthController::class, 'update']);
Route::get('/user', [AuthController::class, 'user']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);
    
      Route::get('/cart', [CartController::class, 'index']);
    
    // Add item to cart
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    
    // Update cart item quantity
    Route::put('/cart/{cartItemId}', [CartController::class, 'updateQuantity']);
    
    // Remove item from cart
    Route::delete('/cart/{cartItemId}', [CartController::class, 'removeFromCart']);
    
    // Clear entire cart
    Route::delete('/cart', [CartController::class, 'clearCart']);
    
    // Get cart summary (total items and amount)
    Route::get('/cart/summary', [CartController::class, 'getCartSummary']);
    
    
    Route::post('/images/upload', [ImageController::class, 'upload']);

    Route::put('/images/{id}', [ImageController::class, 'update']);
    Route::delete('/images/{id}', [ImageController::class, 'destroy']);
    
    Route::post('/logout', [AuthController::class, 'logout']);
});