import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice.js";
import adminReducer from "./Admin/productSlice.js";
import shopReducer from "./Shop/shopSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    shop: shopReducer,
  },
});
export default store;
