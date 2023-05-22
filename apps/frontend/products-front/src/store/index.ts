import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import productsSlice from './productsSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export default store;
