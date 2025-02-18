import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketStatus, OrderFeedData } from "../../utils/types";

type OrderFeedState = {
  status: WebSocketStatus;
  data: OrderFeedData | null;
  connectionError: string | null;
};

const initialState: OrderFeedState = {
  status: WebSocketStatus.OFFLINE,
  data: null,
  connectionError: null,
};

export const ProfileOrdersSlice = createSlice({
  name: "profileOrders",
  initialState,
  reducers: {
    authWsConnecting: (state) => {
      state.status = WebSocketStatus.CONNECTING;
    },
    authWsOpen: (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.connectionError = null;
    },
    authWsClose: (state) => {
      state.status = WebSocketStatus.OFFLINE;
    },
    authWsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    authWsMessage: (state, action: PayloadAction<OrderFeedData>) => {
      state.data = action.payload;
    },
  },
});

export type WsAuthInternalActions = ReturnType<
  (typeof ProfileOrdersSlice.actions)[keyof typeof ProfileOrdersSlice.actions]
>;
export const {
  authWsClose,
  authWsConnecting,
  authWsError,
  authWsMessage,
  authWsOpen,
} = ProfileOrdersSlice.actions;
export default ProfileOrdersSlice.reducer;
