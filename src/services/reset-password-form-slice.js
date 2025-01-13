import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../utils/request";

export const resetPassword = createAsyncThunk(
  "resetPasswordForm/resetPassword",
  async (password, token) => {
    const response = await request("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ password: password, token: token }),
    });
    return await response;
  }
);

const initialState = {
  form: {
    password: "",
    code: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

const resetPasswordFormSlice = createSlice({
  name: "resetPasswordForm",
  initialState,
  reducers: {
    resetPasswordFormSetValue: (state, action) => {
      state.form[action.payload.field] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordFailed = false;
        state.resetPasswordRequest = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordFailed = false;
        state.resetPasswordRequest = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.resetPasswordFailed = true;
        state.resetPasswordRequest = false;
      });
  },
});

export const { resetPasswordFormSetValue } = resetPasswordFormSlice.actions;
export default resetPasswordFormSlice.reducer;
