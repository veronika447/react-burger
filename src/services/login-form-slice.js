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
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { loginFormSetValue } = loginFormSlice.actions;
export default loginFormSlice.reducer;
