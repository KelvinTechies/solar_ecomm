import { configureStore } from '@reduxjs/toolkit';
import productSlice from './reducx/productSlice';
import orderSlice from './reducx/orderSlice';
import authReducer from './reducx/authSlice'
import accountSlice from './reducx/accountSlice';
export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    orders: orderSlice.reducer,
      auth: authReducer,
      accounts: accountSlice.reducer
  },
});