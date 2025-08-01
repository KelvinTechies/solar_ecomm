// src/features/accounts/accountSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

const API_URL = "/api/accounts";

export const fetchAccounts = createAsyncThunk(
    'accounts/fetchAccounts',
    async () => {
        const response = await api.get(API_URL);
        return response.data.data;
    }
);

export const addAccount = createAsyncThunk(
    'accounts/addAccount',
    async (accountData) => {
        const response = await api.post(API_URL, accountData);
        return response.data.data;
    }
);

export const updateAccount = createAsyncThunk(
    'accounts/updateAccount',
    async ({ id, accountData }) => {
        const response = await api.put(`${API_URL}/${id}`, accountData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    }
);

export const deleteAccount = createAsyncThunk(
    'accounts/deleteAccount',
    async (id) => {
        await api.delete(`${API_URL}/${id}`);
        return id;
    }
);

const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        editingAccount: null  // Added this
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setEditingAccount: (state, action) => {  // Added this reducer
            state.editingAccount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addAccount.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.error = null;
            })
            .addCase(addAccount.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                const index = state.items.findIndex(account => account.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.editingAccount = null;  // Clear editing account after update
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.items = state.items.filter(account => account.id !== action.payload);
                state.error = null;
            });
    }
});

export const { clearError, setEditingAccount } = accountSlice.actions;
export default accountSlice;