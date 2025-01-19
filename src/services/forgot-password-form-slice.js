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
    resetForm: (state) => {
      state.email = "";
    },
  },
});

export const { forgotPasswordFormSetValue, resetForm } = forgotPasswordFormSlice.actions;
export default forgotPasswordFormSlice.reducer;
