import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../utils/request";

export const checkEmail = createAsyncThunk(
  "forgotPasswordForm/checkEmail",
  async (value) => {
    const response = await request("/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: value,
      }),
    });
    return await response;
  }
);

const initialState = {
  form: {
    email: "",
    success: null,
    message: "",
  },
  checkEmailRequest: false,
  checkEmailFailed: false,
};

const forgotPasswordFormSlice = createSlice({
  name: "forgotPasswordForm",
  initialState,
  reducers: {
    forgotPasswordFormSetValue: (state, action) => {
      state.form.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkEmail.pending, (state) => {
        state.checkEmailRequest = true;
        state.checkEmailFailed = false;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.checkEmailFailed = false;
        state.checkEmailRequest = false;
        state.form.message = action.payload.message;
        state.form.success = action.payload.success;
        state.form.email = '';
      })
      .addCase(checkEmail.rejected, (state) => {
        state.checkEmailFailed = true;
        state.checkEmailRequest = false;
      });
  },
});

export const { forgotPasswordFormSetValue } = forgotPasswordFormSlice.actions;
export default forgotPasswordFormSlice.reducer;
