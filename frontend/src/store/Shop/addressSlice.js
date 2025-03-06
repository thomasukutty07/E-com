import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "address/addAddress",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/address/add`,
      formData
    );
    return response?.data;
  }
);
export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
        formData
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Something went wrong!" }
      );
    }
  }
);

export const fetchAllAddress = createAsyncThunk(
  "address/fetchAllAddress",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/address/get/${userId}`
    );
    return response?.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response?.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        (state.isLoading = true), (state.addressList = []);
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddress.pending, (state) => {
        (state.isLoading = true), (state.addressList = []);
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        (state.isLoading = false), (state.addressList = action.payload.data);
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
