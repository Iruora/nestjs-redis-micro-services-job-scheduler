import { createSlice } from '@reduxjs/toolkit';
import { IOrderProducts } from '../types/common';

function initializeCart() {
  const localStorageData = localStorage.getItem('cart');

  if (localStorageData !== null) {
    return JSON.parse(localStorageData);
  }

  return [];
}

const initialCartState: IOrderProducts = {
  products: initializeCart(),
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
        orderQuantity:
          existingProduct?.orderQuantity < existingProduct?.quantity
            ? existingProduct?.orderQuantity + 1
            : existingProduct?.quantity,
      };

      const newProducts = [
        ...state.products.filter((p) => p._id !== payload._id),
        updatedProduct,
      ];

      state.products = newProducts;

      localStorage.setItem('cart', JSON.stringify(newProducts));
    },
    removeProduct: (state, { payload }) => {
      const updatedProducts = state.products.filter(
        (p) => p._id !== payload._id,
      );
      state.products = updatedProducts;
      localStorage.setItem('cart', JSON.stringify(updatedProducts));
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
