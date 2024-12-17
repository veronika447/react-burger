import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    loginFormSetValue: (state, action) => {
      if (action.payload.field === "email") {
        state.email = action.payload.value;
      } else if (action.payload.field === "password") {
        state.password = action.payload.value;
      }
    },
  },
});

export const { loginFormSetValue } = loginFormSlice.actions;
export default loginFormSlice.reducer;
