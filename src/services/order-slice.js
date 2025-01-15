import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderRequest } from "../utils/order";
import { refreshTokenRequest } from "../utils/refresh-token";
import { refreshTokens } from "./auth-slice";

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
    const token = thunkAPI.getState().auth.accessToken;
    const refreshToken = thunkAPI.getState().auth.refreshToken;
    return orderRequest(token, order)
      .then((res) => {
        return res.order.number;
      })
      .catch(() => {
        refreshTokenRequest(refreshToken).then((res) => {
          if (res.success) {
            const newToken = res.accessToken.split(" ")[1];
            const newRefreshToken = res.refreshToken;
            thunkAPI.dispatch(
              refreshTokens({
                accessToken: newToken,
                refreshToken: newRefreshToken,
              })
            );
            return orderRequest(newToken, order);
          }
        });
      });
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
  reducers: {
    resetOrderNumber: (state) => {
      state.orderNumber = null;
    },
  },
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

export const { resetOrderNumber } = orderSlice.actions;
export default orderSlice.reducer;
