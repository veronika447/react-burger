import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginFormState {
  [key: string]: string;
}

const initialState: LoginFormState = {
  email: "",
  password: "",
};

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    loginFormSetValue: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      state.email = "";
      state.password = "";
    },
  },
});

export const { loginFormSetValue, resetForm } = loginFormSlice.actions;
export default loginFormSlice.reducer;
