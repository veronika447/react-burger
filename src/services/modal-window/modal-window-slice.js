import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const modalWindowSlice = createSlice({
  name: "modalValue",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeValue } = modalWindowSlice.actions;
export default modalWindowSlice.reducer;
