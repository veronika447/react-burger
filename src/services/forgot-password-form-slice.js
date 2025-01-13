import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const forgotPasswordFormSlice = createSlice({
  name: "forgotPasswordForm",
  initialState,
  reducers: {
    forgotPasswordFormSetValue: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { forgotPasswordFormSetValue } = forgotPasswordFormSlice.actions;
export default forgotPasswordFormSlice.reducer;
