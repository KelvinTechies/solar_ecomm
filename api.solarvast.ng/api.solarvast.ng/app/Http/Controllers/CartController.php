<?php

namespace App\Http\Controllers;

// use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    /**
     * Display the user's cart items
     */
    public function index(): JsonResponse
    {
        try {
            $userId = Auth::id();
            
            $cartItems = Cart::with(['product:id,name,price,image_url'])
                ->where('user_id', $userId)
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_id' => $item->product_id,
                        'product_name' => $item->product->name ?? 'Unknown Product',
                        'product_price' => $item->product->price ?? 0,
                        'product_image' => $item->product->image_url ?? null,
                        'quantity' => $item->quantity,
                        'subtotal' => ($item->product->price ?? 0) * $item->quantity,
                        'created_at' => $item->created_at,
                        'updated_at' => $item->updated_at,
                    ];
                });

            $total = $cartItems->sum('subtotal');
            $totalItems = $cartItems->sum('quantity');

            return response()->json([
                'success' => true,
                'message' => 'Cart retrieved successfully',
                'data' => [
                    'items' => $cartItems,
                    'total_amount' => $total,
                    'total_items' => $totalItems,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add item to cart
     */
    public function addToCart(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'product_id' => 'required|integer|exists:products,id',
                'quantity' => 'required|integer|min:1|max:100',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = Auth::id();
            $productId = $request->product_id;
            $quantity = $request->quantity;

            // Check if product exists and is available
            $product = Product::where('id', $productId)->first();
            
            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found'
                ], 404);
            }

          

            DB::beginTransaction();

            // Check if item already exists in cart
            $existingCartItem = Cart::where('user_id', $userId)
                ->where('product_id', $productId)
                ->first();

            if ($existingCartItem) {
                // Update quantity if item exists
                $newQuantity = $existingCartItem->quantity + $quantity;
                
              

                $existingCartItem->update([
                    'quantity' => $newQuantity
                ]);

                $cartItem = $existingCartItem;
            } else {
                // Create new cart item
                $cartItem = Cart::create([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'quantity' => $quantity,
                ]);
            }

            DB::commit();

            // Load product relationship for response
            $cartItem->load('product:id,name,price,image_url');

            return response()->json([
                'success' => true,
                'message' => 'Item added to cart successfully',
                'data' => [
                    'cart_item' => [
                        'id' => $cartItem->id,
                        'product_id' => $cartItem->product_id,
                        'product_name' => $cartItem->product->name,
                        'product_price' => $cartItem->product->price,
                        'product_image' => $cartItem->product->image_url,
                        'quantity' => $cartItem->quantity,
                        'subtotal' => $cartItem->product->price * $cartItem->quantity,
                    ]
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to add item to cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update cart item quantity
     */
    public function updateQuantity(Request $request, $cartItemId): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'quantity' => 'required|integer|min:1|max:100',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userId = Auth::id();
            $quantity = $request->quantity;

            $cartItem = Cart::with('product')
                ->where('id', $cartItemId)
                ->where('user_id', $userId)
                ->first();

            if (!$cartItem) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cart item not found'
                ], 404);
            }

            // Check stock availability
            if (isset($cartItem->product->stock) && $cartItem->product->stock < $quantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Insufficient stock available',
                    'available_stock' => $cartItem->product->stock ?? 0
                ], 400);
            }

            $cartItem->update(['quantity' => $quantity]);

            return response()->json([
                'success' => true,
                'message' => 'Cart item updated successfully',
                'data' => [
                    'cart_item' => [
                        'id' => $cartItem->id,
                        'product_id' => $cartItem->product_id,
                        'product_name' => $cartItem->product->name,
                        'product_price' => $cartItem->product->price,
                        'quantity' => $cartItem->quantity,
                        'subtotal' => $cartItem->product->price * $cartItem->quantity,
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update cart item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove item from cart
     */
    public function removeFromCart($cartItemId): JsonResponse
    {
        try {
            $userId = Auth::id();

            $cartItem = Cart::where('id', $cartItemId)
                ->where('user_id', $userId)
                ->first();

            if (!$cartItem) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cart item not found'
                ], 404);
            }

            $cartItem->delete();

            return response()->json([
                'success' => true,
                'message' => 'Item removed from cart successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to remove item from cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Clear all items from cart
     */
    public function clearCart(): JsonResponse
    {
        try {
            $userId = Auth::id();

            Cart::where('user_id', $userId)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Cart cleared successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to clear cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get cart summary (total items and amount)
     */
    public function getCartSummary(): JsonResponse
    {
        try {
            $userId = Auth::id();

            $cartSummary = Cart::with('product:id,price')
                ->where('user_id', $userId)
                ->get()
                ->reduce(function ($carry, $item) {
                    $carry['total_items'] += $item->quantity;
                    $carry['total_amount'] += ($item->product->price ?? 0) * $item->quantity;
                    return $carry;
                }, ['total_items' => 0, 'total_amount' => 0]);

            return response()->json([
                'success' => true,
                'message' => 'Cart summary retrieved successfully',
                'data' => $cartSummary
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve cart summary',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}