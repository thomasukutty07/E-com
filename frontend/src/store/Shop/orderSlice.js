import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData) => {
    try {
          const response = await axios.post(
      `${API_BASE_URL}/api/shop/order/create`,
        orderData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Order creation failed");
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload?.approvalURL || null;
        state.orderId = action.payload?.orderId || null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        console.error("Order creation error:", action.error.message);
      });
  },
});

export default shoppingOrderSlice.reducer;
