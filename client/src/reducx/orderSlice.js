import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import api from '../services/api';

export const submitOrder = createAsyncThunk(
  'orders/submitOrder',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/order", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      Swal.fire({
        icon: "success",
        title: "Order Submitted",
        text: "Order confirmed. Check email for details."
      });

      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error.response?.data?.message || "Something went wrong"
      });
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/orders');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status, email }, { rejectWithValue }) => {
    try {
      // Validate status before sending
      if (!status) {
        throw new Error('Status cannot be empty');
      }

      const formData = {
        status: status,
        email: email
      };

      console.log('Sending update with data:', formData); // Debug log

      const response = await api.post(`/api/order/${orderId}`, formData);
      
      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Order Updated',
          text: `Order status changed to ${status}`
        });
        return response.data;
      }

      throw new Error('No data received from server');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to update order status';
      
      console.error('Update error:', error.response?.data || error); // Debug log
      
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: errorMessage
      });
      
      return rejectWithValue({
        message: errorMessage,
        errors: error.response?.data?.errors
      });
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    order: null,
    loading: false,
    error: null,
    orders:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
.addCase(fetchOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload.orders || [];
})
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          order => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  }
});

export default orderSlice;