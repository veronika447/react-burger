import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../utils/request";

export const getOrderNumber = createAsyncThunk(
  "order/orderNumber",
  async (_, thunkAPI) => {
    const order = [
      thunkAPI.getState().burgerConstructor.bun._id,
      ...thunkAPI
        .getState()
        .burgerConstructor.ingredients.map((item) => item._id),
      thunkAPI.getState().burgerConstructor.bun._id,
    ];
    const response = await request("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ingredients: order }),
    });
    return await response.order.number;
  }
);

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderFailed = false;
        state.orderNumber = action.payload;
      })
      .addCase(getOrderNumber.pending, (state) => {
        state.orderFailed = false;
        state.orderRequest = true;
      })
      .addCase(getOrderNumber.rejected, (state) => {
        state.orderFailed = true;
        state.orderRequest = false;
      });
  },
});

export default orderSlice.reducer; 