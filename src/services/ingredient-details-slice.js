import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  src: "",
  name: "",
  calories: "",
  proteins: "",
  fat: "",
  carbohydrates: "",
};

const ingredientDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    addDetails: (state, action) => {
      state.src = action.payload.image_large;
      state.name = action.payload.name;
      state.calories = action.payload.calories;
      state.proteins = action.payload.proteins;
      state.fat = action.payload.fat;
      state.carbohydrates = action.payload.carbohydrates;
    },
  },
});

export const { addDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
