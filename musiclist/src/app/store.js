import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('[Middleware] Dispatching:', action);
  const result = next(action);
  console.log('[Middleware] Next State:', storeAPI.getState());
  return result;
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
