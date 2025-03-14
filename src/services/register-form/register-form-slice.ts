import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type RegisterFormState = {
  [key: string]: string;
};

export const initialState: RegisterFormState = {
  name: "",
  email: "",
  password: "",
};

const registerFormSlice = createSlice({
  name: "registerForm",
  initialState,
  reducers: {
    registerFormSetValue: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
    },
  },
});

export const { registerFormSetValue, resetForm } = registerFormSlice.actions;
export default registerFormSlice.reducer;
