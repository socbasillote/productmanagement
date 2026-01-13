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
  list: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetchProductsAPI();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
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
      //fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p._id === action.payload._id);
        state.list[index] = action.payload;
        state.selectedProduct = null;
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
      });
  },
});

export const { selectProduct, clearSelectedProduct, setLoading, setError } =
  productSlice.actions;

export default productSlice.reducer;
