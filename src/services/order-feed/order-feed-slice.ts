import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderFeedData } from "../../utils/types";

type OrderFeedState = {
  status: "CONNECTING..." | "ONLINE" | "OFFLINE";
  data: OrderFeedData | null;
  connectionError: string | null;
};

export const initialState: OrderFeedState = {
  status: "OFFLINE",
  data: null,
  connectionError: null,
};

export const OrderFeedSlice = createSlice({
  name: "orderFeed",
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = "CONNECTING...";
    },
    wsOpen: (state) => {
      state.status = "ONLINE";
      state.connectionError = null;
    },
    wsClose: (state) => {
      state.status = "OFFLINE";
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action: PayloadAction<OrderFeedData>) => {
      state.data = action.payload;
    },
  },
});

export type WsInternalActions = ReturnType<
  (typeof OrderFeedSlice.actions)[keyof typeof OrderFeedSlice.actions]
>;
export const { wsClose, wsConnecting, wsError, wsMessage, wsOpen } =
  OrderFeedSlice.actions;
export default OrderFeedSlice.reducer;
