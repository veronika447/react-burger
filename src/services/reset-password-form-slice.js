import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  password: "",
  code: "",
};

const resetPasswordFormSlice = createSlice({
  name: "resetPasswordForm",
  initialState,
  reducers: {
    resetPasswordFormSetValue: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      state.password = "";
      state.code = "";
    },
  },
});

export const { resetPasswordFormSetValue, resetForm } = resetPasswordFormSlice.actions;
export default resetPasswordFormSlice.reducer;
