import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketStatus, Orders } from "../utils/types";

type OrderFeedState = {
  status: WebSocketStatus;
  orders: Orders;
  connectionError: string | null;
};

const initialState: OrderFeedState = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  connectionError: null,
};

export const OrderFeedSlice = createSlice({
  name: "orderFeed",
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebSocketStatus.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.connectionError = null;
    },
    wsClose: (state) => {
      state.status = WebSocketStatus.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action: PayloadAction<Orders>) => {
      state.orders = action.payload;
    },
  },
});

export type WsInternalActions = ReturnType<
  (typeof OrderFeedSlice.actions)[keyof typeof OrderFeedSlice.actions]
>;
export const { wsClose, wsConnecting, wsError, wsMessage, wsOpen } =
  OrderFeedSlice.actions;
export default OrderFeedSlice.reducer;
