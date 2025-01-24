import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../utils/types";

type AuthState = {
  user: User | null;
  accessToken: string;
  refreshToken: string;
};

const initialState: AuthState = {
  user: null,
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    removeUserData: (state) => {
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
    },
    changeUserInfo: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    refreshTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setUserData, removeUserData, changeUserInfo, refreshTokens } =
  authSlice.actions;
export default authSlice.reducer;
