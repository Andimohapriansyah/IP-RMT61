import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/menu";

export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const searchMenuAI = createAsyncThunk(
  "menu/searchMenuAI",
  async (query) => {
    const res = await axios.post(`${API_URL}/search-ai`, { query });
    return res.data;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: { items: [], searchResults: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(searchMenuAI.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.status = "succeeded";
      });
  },
});

export default menuSlice.reducer;
