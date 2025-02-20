import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ResetPasswordFormState = {
  [key: string]: string;
};

export const initialState: ResetPasswordFormState = {
  password: "",
  code: "",
};

const resetPasswordFormSlice = createSlice({
  name: "resetPasswordForm",
  initialState,
  reducers: {
    resetPasswordFormSetValue: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      state.password = "";
      state.code = "";
    },
  },
});

export const { resetPasswordFormSetValue, resetForm } =
  resetPasswordFormSlice.actions;
export default resetPasswordFormSlice.reducer;
