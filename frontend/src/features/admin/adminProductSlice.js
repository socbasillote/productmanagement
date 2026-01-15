import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Fetch products of a user
export const fetchUserProducts = createAsyncThunk(
  "adminProducts/fetchUserProducts",

  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/admin/users/${userId}/products`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Admin delete product
export const adminDeleteProduct = createAsyncThunk(
  "adminProducts/delete",

  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/admin/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(adminDeleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export const { clearProducts } = adminProductSlice.actions;

export default adminProductSlice.reducer;
