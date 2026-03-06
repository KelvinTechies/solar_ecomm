<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class ImageController extends Controller
{
    /**
     * Upload an image to public directory
     */
    public function upload(Request $request): JsonResponse
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Check if file was uploaded properly
            if (!$request->hasFile('image')) {
                return response()->json([
                    'success' => false,
                    'message' => 'No image file found in request'
                ], 400);
            }

            $imageFile = $request->file('image');
            
            // Check if file is valid
            if (!$imageFile->isValid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid file upload'
                ], 400);
            }
            
            // Get file information BEFORE moving it
            $originalName = $imageFile->getClientOriginalName();
            $fileSize = $imageFile->getSize();
            $mimeType = $imageFile->getMimeType();
            $extension = $imageFile->getClientOriginalExtension();
            
            // Generate unique filename
            $filename = time() . '_' . Str::random(10) . '.' . $extension;
            
            // Create images directory in public if it doesn't exist
            $destinationPath = public_path('images');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true);
            }
            
            // Move file to public/images directory
            $moved = $imageFile->move($destinationPath, $filename);
            
            if (!$moved) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to move uploaded file'
                ], 500);
            }
            
            // Verify file was moved successfully
            $fullPath = $destinationPath . '/' . $filename;
            if (!File::exists($fullPath)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File was not saved properly'
                ], 500);
            }
            
            // Generate the public URL
            $url = '/images/' . $filename;
            $fullUrl = url('images/' . $filename);
            
            // Save to database
            $image = Image::create([
                'title' => $request->title,
                // 'description' => $request->description,
                'filename' => $filename,
                'path' => 'images/' . $filename,
                'url' => $url,
                'size' => $fileSize,
                'mime_type' => $mimeType,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'data' => $image->fresh() // Return fresh data from database
            ], 201);

        } catch (\Exception $e) {
            // Log the full error for debugging
            \Log::error('Image upload failed: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all uploaded images
     */
    public function index(): JsonResponse
    {
        try {
            $images = Image::latest()->get();

            return response()->json([
                'success' => true,
                'data' => $images
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch images',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an image
     */
    public function update(Request $request, $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $image = Image::findOrFail($id);
            
            $image->update([
                'title' => $request->title,
                // 'description' => $request->description,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Image updated successfully',
                'data' => $image->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete an image
     */
    public function destroy($id): JsonResponse
    {
        try {
            $image = Image::findOrFail($id);
            
            // Delete the physical file from public directory
            $filePath = public_path($image->path);
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
            
            // Delete from database
            $image->delete();

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}