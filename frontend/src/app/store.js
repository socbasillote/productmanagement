import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";
import adminUserReducer from "../features/admin/adminUserSlice";
import adminProductReducer from "../features/admin/adminProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    adminUsers: adminUserReducer,
    adminProducts: adminProductReducer,
  },
});
