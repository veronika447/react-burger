import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ForgotPasswordState = {
  email: string;
};

const initialState: ForgotPasswordState = {
  email: "",
};

const forgotPasswordFormSlice = createSlice({
  name: "forgotPasswordForm",
  initialState,
  reducers: {
    forgotPasswordFormSetValue: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetForm: (state) => {
      state.email = "";
    },
  },
});

export const { forgotPasswordFormSetValue, resetForm } =
  forgotPasswordFormSlice.actions;
export default forgotPasswordFormSlice.reducer;
