import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      `${Import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      `${Import.meta.env.VITE_API_URL}/api/admin/products/get`
    );
    return result?.data;
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${Import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData
    );
    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${Import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default productSlice.reducer;
