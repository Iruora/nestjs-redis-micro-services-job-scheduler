import { createSlice } from '@reduxjs/toolkit';
import { IOrderProducts } from '../types/common';

const initialCartState: IOrderProducts = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addProduct: (state, { payload }) => {
      const existingProduct = state.products.find(
        (p) => p._id === payload._id,
      ) || { ...payload, orderQuantity: 0 };

      const updatedProduct = {
        ...existingProduct,
        orderQuantity: existingProduct?.orderQuantity + 1,
      };

      state.products = [
        ...state.products.filter((p) => p._id !== payload._id),
        updatedProduct,
      ];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
