/* 
    // Product State Design
     - Redux state must answer four questions:
     1. What products exits?
     2. Are we loading?
     3. Did an error occur?
     4. Are we editing a product?
*/

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(product) {
        return {
          payload: {
            ...product,
            _id: nanoid(),
            createdAt: new Date().toISOString(),
          },
        };
      },
    },

    updateProduct(state, action) {
      const index = state.list.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      state.selectedProduct = null;
    },

    deleteProduct(state, action) {
      state.list = state.list.filter((item) => item._id !== action.payload);
    },

    selectProduct(state, action) {
      state.selectedProduct = action.payload;
    },

    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  selectProduct,
  clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
