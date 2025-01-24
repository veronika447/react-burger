import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ModalWindowState = {
  value: string | null;
};

const initialState: ModalWindowState = {
  value: null,
};

const modalWindowSlice = createSlice({
  name: "modalValue",
  initialState,
  reducers: {
    changeValue: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload;
    },
  },
});

export const { changeValue } = modalWindowSlice.actions;
export default modalWindowSlice.reducer;
