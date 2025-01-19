import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const registerFormSlice = createSlice({
  name: "registerForm",
  initialState,
  reducers: {
    registerFormSetValue: (state, action) => {
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
