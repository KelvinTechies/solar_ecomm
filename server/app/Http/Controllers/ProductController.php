<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(): JsonResponse
    {
        $products = Product::all()->map(function ($product) {
            $product->price = number_format($product->price, 2); // Formats price to 2 decimal places
            return $product;
        });

        if ($products->isEmpty()) {
            return response()->json([
                'status' => 'failed',
                'data' => "No Products"
            ]);
        }
        if ($products) {
            return response()->json([
                'status' => 'success',
                'data' => $products
            ]);
        }



    }

    /**
     * Store a newly created product.
     */
    // public function store(Request $request): JsonResponse
    // {
    //     try {
    //         // Updated validation
    //         $validated = $request->validate([
    //             'name' => 'required|string|max:255|unique:products',
    //             'price' => 'required|numeric|min:0',
    //             'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:12048',
    //             'video' => 'nullable|mimes:mp4,avi,mkv|max:12048', // Video is optional
                
    //             'description' => 'required',
    //         ]);

    //         Log::debug('Validated Request Data: ' . json_encode($validated));

    //         $imageUrl = null;
    //         $videoUrl = null;

    //         if ($request->hasFile('image')) {
    //             $image = $request->file('image');
    //             $imageName = time() . '_' . $image->getClientOriginalName();
    //             $image->move(public_path('uploads'), $imageName);
    //             $imageUrl = 'uploads/' . $imageName; // ✅ Save correct image path
    //         }

    //         if ($request->hasFile('video')) {
    //             Log::debug('Video upload attempt', [
    //                 'mime' => $request->file('video')->getMimeType(),
    //                 'size' => $request->file('video')->getSize(),
    //                 'name' => $request->file('video')->getClientOriginalName(),
    //                 'disk_free' => disk_free_space(storage_path())
    //             ]);

    //             try {
    //                 $video = $request->file('video');
    //                 $videoName = time() . '_' . $video->getClientOriginalName();
    //                 $video->move(public_path('videos'), $videoName);
    //                 $videoUrl = 'videos/' . $videoName; // ✅ Save correct video path

    //                 Log::debug('Video stored at: ' . $videoUrl);
    //             } catch (\Exception $e) {
    //                 Log::error($e->getMessage());
    //                 throw $e;
    //             }
    //         }

    //         // Create the product
    //         $product = Product::create([
    //             'name' => $validated['name'],
    //             'price' => $validated['price'],
    //             'description' => $validated['description'],
    //             'image_url' => $imageUrl, // ✅ Now properly storing the image path
    //             'video_url' => $videoUrl, // ✅ Now properly storing the video path
    //         ]);

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Product created successfully',
    //             'product' => $product
    //         ], 201);
    //     } catch (\Exception $e) {
    //         Log::error('Error creating product: ' . $e->getMessage());
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Failed to create product',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }
// ProductController.php
public function store(Request $request): JsonResponse
{
    try {
        Log::debug('Received files:', [
            'has_additional_images' => $request->hasFile('additional_images'),
            'needs_memory_card' => $request->hasFile('needs_memory_card'),
            'additional_images_count' => $request->hasFile('additional_images') ? count($request->file('additional_images')) : 0
        ]);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:products',
            'price' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:122048',
            'additional_images' => 'nullable|array',
            'additional_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:122048',
            'video' => 'nullable|mimes:mp4,avi,mkv|max:122048',
            'description' => 'required',
           'needs_memory_card' => 'required|boolean',
           'free_delivery' => 'required|boolean',
           
        ]);

        $mainImageUrl = null;
        $additionalImageUrls = [];
        $videoUrl = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = 'main_' . time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads'), $imageName);
            $mainImageUrl = 'uploads/' . $imageName;
        }
        if ($request->hasFile('additional_images')) {
            Log::debug('Processing additional images');
            foreach ($request->file('additional_images') as $key => $image) {
                Log::debug("Processing image {$key}: " . $image->getClientOriginalName());
                $imageName = 'additional_' . time() . '_' . $key . '_' . $image->getClientOriginalName();
                $image->move(public_path('uploads'), $imageName);
                $additionalImageUrls[] = 'uploads/' . $imageName;
            }
            Log::debug('Final additional image URLs:', $additionalImageUrls);
        }

        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $videoName = time() . '_' . $video->getClientOriginalName();
            $video->move(public_path('videos'), $videoName);
            $videoUrl = 'videos/' . $videoName;
        }
        $needsMemoryCard = filter_var($request->input('needs_memory_card', false), FILTER_VALIDATE_BOOLEAN);
        $free_delivery = filter_var($request->input('free_delivery', false), FILTER_VALIDATE_BOOLEAN);

        $product = Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'description' => $validated['description'],
            'image_url' => $mainImageUrl,
            'additional_image_urls' => json_encode($additionalImageUrls),
            'video_url' => $videoUrl,
            'needs_memory_card' => $needsMemoryCard, // Now properly converted to a boolean
            'free_delivery' => $free_delivery, // Now properly converted to a boolean
        ]);
        
        // $product = Product::create([
        //     'name' => $validated['name'],
        //     'price' => $validated['price'],
        //     'description' => $validated['description'],
        //     'image_url' => $mainImageUrl,
        //     'additional_image_urls' => json_encode($additionalImageUrls),
        //     'video_url' => $videoUrl,
        //     'needs_memory_card' => $needsMemoryCard,
        // ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Product created successfully',
            'product' => $product
        ], 201);
    } catch (\Exception $e) {
        Log::error('Error creating product: ' . $e->getMessage());
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to create product',
            'error' => $e->getMessage()
        ], 500);
    }
}




    /**
     * Display the specified product.
     */
    public function show($id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['status' => 'error', 'message' => 'Product not found'], 404);
        }

        return response()->json(['status' => 'success', 'data' => $product]);
    }


    /**
     * Update the specified product.
     */


    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);

            // Updated validation
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255|unique:products,name,' . $id,
                'price' => 'sometimes|required|numeric|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:12048',
                'video' => 'nullable|mimes:mp4,avi,mkv|max:12048', // ✅ Make video optional
                'description' => 'sometimes|required',
                'needs_memory_card' => 'sometimes|boolean', 
                'free_delivery' => 'sometimes|boolean', 
            ]);

            // ✅ Handle Image Update
            if ($request->hasFile('image')) {
                // Delete old image if it exists
                if ($product->image_url) {
                    $oldImagePath = public_path($product->image_url);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }

                // Process new image
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('uploads'), $imageName);
                $validated['image_url'] = 'uploads/' . $imageName; // ✅ Save correct path
            } else {
                $validated['image_url'] = $product->image_url; // ✅ Retain old image
            }

            // ✅ Handle Video Update
            if ($request->hasFile('video')) {
                // Delete old video if it exists
                if ($product->video_url) {
                    $oldVideoPath = public_path($product->video_url);
                    if (File::exists($oldVideoPath)) {
                        File::delete($oldVideoPath);
                    }
                }

                // Process new video
                $video = $request->file('video');
                $videoName = time() . '_' . $video->getClientOriginalName();
                $video->move(public_path('videos'), $videoName);
                $validated['video_url'] = 'videos/' . $videoName; // ✅ Save correct path
            } else {
                $validated['video_url'] = $product->video_url; // ✅ Retain old video
            }
            if (!$request->has('needs_memory_card')) {
                $validated['needs_memory_card'] = $product->needs_memory_card;
            }
            if (!$request->has('free_delivery')) {
                $validated['free_delivery'] = $product->free_delivery;
            }
            
            // ✅ Update product
            $product->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Product updated successfully',
                'product' => $product, // Return updated product
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified product.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();

            return response()->json([
                'status' =>200,
                'message' => 'Product deleted successfully'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }
    }

    /**
     * Search products by name or description.
     */

}