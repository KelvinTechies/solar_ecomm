<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use GetStream\StreamChat\Client as StreamClient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    private StreamClient $streamClient;
    
    public function __construct()
    {
        // Initialize Stream Chat client
        $this->streamClient = new StreamClient(
            config('services.stream.key'),
            config('services.stream.secret')
        );
    }
    
    /**
     * Generate Stream Chat token for authenticated user
     */
    public function generateToken(Request $request): JsonResponse
    {
        try {
            // Ensure user is authenticated
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            
            // Generate Stream Chat token
            $userId = (string) $user->id;
            $token = $this->streamClient->createToken($userId);
            
            // Optionally, upsert user in Stream Chat
            // This ensures the user exists in Stream's system
            try {
                $this->streamClient->upsertUser([
                    'id' => $userId,
                    'name' => $user->name,
                    'image' => $user->avatar ?? '', // Add avatar if you have one
                    'email' => $user->email,
                ]);
            } catch (\Exception $e) {
                Log::warning('Failed to upsert user to Stream Chat: ' . $e->getMessage());
            }
            
            return response()->json([
                'success' => true,
                'token' => $token,
                'user_id' => $userId,
            ]);
            
        } catch (\Exception $e) {
            Log::error('Stream Chat token generation failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to generate chat token',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Create or get a chat channel
     */
    public function createChannel(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            
            $request->validate([
                'channel_type' => 'required|string',
                'channel_id' => 'required|string',
                'channel_name' => 'string',
                'members' => 'array',
            ]);
            
            $channel = $this->streamClient->channel(
                $request->channel_type,
                $request->channel_id,
                [
                    'name' => $request->channel_name ?? 'Chat Room',
                    'created_by_id' => (string) $user->id,
                    'members' => array_merge(
                        [(string) $user->id],
                        $request->members ?? []
                    ),
                ]
            );
            
            $response = $channel->create((string) $user->id);
            
            return response()->json([
                'success' => true,
                'channel' => $response,
            ]);
            
        } catch (\Exception $e) {
            Log::error('Stream Chat channel creation failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to create channel',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
