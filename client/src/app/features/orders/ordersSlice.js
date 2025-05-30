import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/orders";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token) => {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ menuId, quantity, preorder, token }) => {
    const res = await axios.post(
      API_URL,
      { menuId, quantity, preorder },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);

export const payOrder = createAsyncThunk(
  "orders/payOrder",
  async ({ orderId, token }) => {
    const res = await axios.post(
      `${API_URL}/${orderId}/pay`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async ({ orderId, token }) => {
    const res = await axios.delete(`${API_URL}/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.status = "succeeded";
    });
  },
});

export default ordersSlice.reducer;
