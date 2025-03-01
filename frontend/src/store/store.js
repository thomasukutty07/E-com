import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice.js";
import adminReducer from "./Admin/productSlice.js";
import shopReducer from "./Shop/shopSlice.js";
import cartReducer from "./Shop/cartSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    shop: shopReducer,
    cart: cartReducer,
  },
});
export default store;
