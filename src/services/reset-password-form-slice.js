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
  },
});

export const { resetPasswordFormSetValue } = resetPasswordFormSlice.actions;
export default resetPasswordFormSlice.reducer;
