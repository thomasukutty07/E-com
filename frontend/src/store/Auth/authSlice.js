import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
  const response = await axios.get(
    `/api/auth/check-auth`,

    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      `/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const response = await axios.post(
    `/api/auth/login`,
    formData,
    { withCredentials: true }
  );
  return response.data;
});
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    `/api/auth/logout`,
    {},

    { withCredentials: true }
  );
  return response.data;
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => { },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.success;
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.success;
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
