import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Create async thunk for adding product
// export const addProduct = createAsyncThunk(
//   'products/addProduct',
//   async (productData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append('name', productData.name);
//       formData.append('price', productData.price);
//       formData.append('description', productData.description);
//       if (productData.image) {
//         formData.append('image', productData.image);
//       }
//         if (productData.video_img) {
//         formData.append('video', productData.video_img);
//       }

//       const response = await api.post('api/products', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to add product');
//     }
//   }
// );
// productSlice.js
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('needs_memory_card', productData.needs_memory_card ? '1' : '0');
      formData.append('free_delivery', productData.free_delivery ? '1' : '0');
      
      if (productData.image) {
        formData.append('image', productData.image);
      }

      // Log the number of additional images
      console.log("Number of additional images in thunk:", productData.additional_images.length);

      if (productData.additional_images && productData.additional_images.length > 0) {
        productData.additional_images.forEach((image, index) => {
          // Note the brackets in the name to indicate it's an array
          formData.append('additional_images[]', image);
          console.log(`Appending additional image ${index}:`, image.name);
        });
      }

      if (productData.video) {
        formData.append('video', productData.video);
      }

      const response = await api.post('api/products', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);
// Create async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('api/products');
        console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Create async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`api/product/${productId}`);

      if (response.status === 200) {
        console.log(response.data);
        return { productId, message: response.data.message }; // Always return an object
      }

      // Explicitly reject if not a success response
      return rejectWithValue(response.data.message || "Failed to delete product");
    } catch (error) {
      console.error("Error deleting product:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to delete product");
    }
  }
);



export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('needs_memory_card', productData.needs_memory_card ? '1' : '0');
      formData.append('free_delivery', productData.free_delivery ? '1' : '0');

      if (productData.image) {
        formData.append('image', productData.image);
      }
        if (productData.video) {
        formData.append('video', productData.video);
      }

      const response = await api.post(`api/product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], 
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add Product cases
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Fetch Products cases
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log("Before filtering, state.items:", state.items); // Debugging
        if (Array.isArray(state.items)) {  // ✅ Prevents errors
          state.items = state.items.filter(product => product.id !== action.payload.productId);
        }
        console.log("After filtering, state.items:", state.items);
        state.loading = false;
        state.error = null;
      })
      
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { resetState } = productSlice.actions;
export default productSlice;
