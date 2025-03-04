import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice.js";
import adminSlice from "./Admin/productSlice.js";
import shopSlice from "./Shop/shopSlice.js";
import cartSlice from "./Shop/cartSlice.js";
import addressSlice from "./Shop/addressSlice.js";
const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
    shop: shopSlice,
    cart: cartSlice,
    address: addressSlice,
  },
});
export default store;
