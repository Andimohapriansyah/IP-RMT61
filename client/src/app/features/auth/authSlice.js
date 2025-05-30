import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    const res = await axios.post(`${API_URL}/api/auth/register`, userData);
    return res.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, userData);
    return res.data;
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "succeeded";
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.status = "succeeded";
        localStorage.setItem("token", action.payload.token);
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
