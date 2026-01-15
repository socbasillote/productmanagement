/* 
    // Product State Design
     - Redux state must answer four questions:
     1. What products exits?
     2. Are we loading?
     3. Did an error occur?
     4. Are we editing a product?
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productAPI";

const initialState = {
  products: [],
  page: 1,
  pages: 1,
  selectedProduct: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (params) => {
    return await fetchProductsAPI(params);
  }
);

export const addProduct = createAsyncThunk(
  "products/create",
  async (product, thunkAPI) => {
    try {
      const res = await createProductAPI(product);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }, thunkAPI) => {
    try {
      const res = await updateProductAPI({ id, product });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      await deleteProductAPI(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectProduct(state, action) {
      state.selectedProduct = action.payload;
    },

    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch product
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })

      // CREATE
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        state.products[index] = action.payload;
        state.selectedProduct = null;
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export const { selectProduct, clearSelectedProduct, setLoading, setError } =
  productSlice.actions;

export default productSlice.reducer;
