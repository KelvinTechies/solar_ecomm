<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        try {
            $accounts = Account::all();
            return response()->json([
                'status' => 'success',
                'data' => $accounts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch accounts'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'account_number' => 'required',
                'account_name' => 'required',
                'bank_name' => 'required',
            ]);

            $account = Account::create($validated);
            return response()->json([
                'status' => 'success',
                'data' => $account,
                'message' => 'Account created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $account = Account::findOrFail($id);
            
            \Log::info('Raw request content: ' . $request->getContent());
            \Log::info('Parsed request data: ' . json_encode($request->all()));
    
            $validated = $request->validate([
                'bank_name' => 'required|string',
                'account_name' => 'required|string',
                'account_number' => 'required|string'
            ]);
    
            \Log::info('Validated data: ' . json_encode($validated));
    
            $account->update($validated);
            
            return response()->json([
                'status' => 'success',
                'data' => $account,
                'message' => 'Account updated successfully'
            ]);
        } catch (ValidationException $e) {
            \Log::error('Validation failed: ' . json_encode($e->errors()));
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Update failed: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $account = Account::findOrFail($id);
            $account->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Account deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete account'
            ], 500);
        }
    }
}