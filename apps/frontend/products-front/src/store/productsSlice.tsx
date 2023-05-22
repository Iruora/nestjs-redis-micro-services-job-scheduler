import { createSlice } from '@reduxjs/toolkit';
import { IProducts } from '../types/product';

const initialProductsState: IProducts = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    initializeProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
