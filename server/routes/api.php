<?php

use App\Http\Controllers\Account;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/register', [ AuthController::class, 'register']);
Route::get('/users', [AuthController::class, 'AllUsers']);
Route::post('/login', [ AuthController::class, 'login']);
Route::post('/track-order', [ OrderController::class, 'track']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);
Route::post('/order', [OrderController::class, 'store']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);
Route::get('/accounts', [AccountController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/accounts', [AccountController::class, 'store']);
Route::get('/accounts/{id}', [AccountController::class, 'show']);
Route::put('/accounts/{id}', [AccountController::class, 'update']);
Route::delete('/accounts/{id}', [AccountController::class, 'destroy']);
    Route::post('/product/{id}', [ProductController::class, 'update']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/order/{id}', [OrderController::class,
    'updateStatus']);
    Route::post('/user/update', [AuthController::class, 'update']);
Route::get('/user', [AuthController::class, 'user']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
});