import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const initialState = {
  isLoading: true,
  productList: [],
  productDetails: null,
};

export const fetchAllShopProduct = createAsyncThunk(
  "/shop/fetchShopProudcts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const response = await axios.get(
      `${API_BASE_URL}/api/shop/products/get?${query}`
    );
    return response.data;
  }
);
export const fetchProductDetails = createAsyncThunk(
  "/shop/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/shop/products/get/${id}`
    );
    return response.data;
  }
);

const shopProductSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setProductDeatils: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShopProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllShopProduct.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productList = action.payload.data);
      })
      .addCase(fetchAllShopProduct.rejected, (state) => {
        (state.isLoading = false), (state.productList = []);
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});
export const { setProductDeatils } = shopProductSlice.actions
export default shopProductSlice.reducer;
