import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    removeUserData: (state) => {
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { setUserData, removeUserData } = authSlice.actions;
export default authSlice.reducer;
