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

export const ProfileOrdersSlice = createSlice({
  name: "profileOrders",
  initialState,
  reducers: {
    authWsConnecting: (state) => {
      state.status = "CONNECTING...";
    },
    authWsOpen: (state) => {
      state.status = "ONLINE";
      state.connectionError = null;
    },
    authWsClose: (state) => {
      state.status = "OFFLINE";
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
