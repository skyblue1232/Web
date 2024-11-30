// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from '../features/cartSlice';
// import modalReducer from '../features/modalSlice';

// const loggerMiddleware = (storeAPI) => (next) => (action) => {
//   console.log('[Middleware] Dispatching:', action);
//   const result = next(action);
//   console.log('[Middleware] Next State:', storeAPI.getState());
//   return result;
// };

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     modal: modalReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
// });

// export default store;
