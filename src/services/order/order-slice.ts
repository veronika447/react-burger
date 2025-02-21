import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderRequest } from "../../utils/order";
import { refreshTokenRequest } from "../../utils/refresh-token";
import { refreshTokens } from "../auth/auth-slice";
import { type IngredientType } from "../../utils/types";
import { type ThunkAPI } from "../../utils/types";

export const getOrderNumber = createAsyncThunk<number, void, ThunkAPI>(
  "order/orderNumber",
  async (_, thunkAPI) => {
    const order: string[] = [
      thunkAPI.getState().burgerConstructor.bun!._id,
      ...thunkAPI
        .getState()
        .burgerConstructor.ingredients.map((item: IngredientType) => item._id),
      thunkAPI.getState().burgerConstructor.bun!._id,
    ];

    const token: string = thunkAPI.getState().auth.accessToken;
    const refreshToken: string = thunkAPI.getState().auth.refreshToken;

    return orderRequest(token, order)
      .then((res) => {
        return res.order.number;
      })
      .catch(async () => {
        return refreshTokenRequest(token, refreshToken).then((res) => {
          if (res.success) {
            const newToken = res.accessToken.split(" ")[1];
            const newRefreshToken = res.refreshToken;
            thunkAPI.dispatch(
              refreshTokens({
                accessToken: newToken,
                refreshToken: newRefreshToken,
              })
            );
            return orderRequest(newToken, order)
              .then((res) => {
                return res.order.number;
              })
              .catch(() => {
                return thunkAPI.rejectWithValue("Error after refresh");
              });
          } else {
            return thunkAPI.rejectWithValue("Error refresh");
          }
          console.log(
            "🚀 ~ returnrefreshTokenRequest ~ rejectWithValue:",
            thunkAPI.rejectWithValue
          );
        });
      });
  }
);

type OrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderNumber: number | null;
};

export const initialState: OrderState = {
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
