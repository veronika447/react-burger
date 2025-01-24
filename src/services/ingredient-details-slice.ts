import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IngredientDetailsState {
  image_large: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

const initialState: IngredientDetailsState = {
  image_large: "",
  name: "",
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
};

const ingredientDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    addDetails: (state, action: PayloadAction<IngredientDetailsState>) => {
      state.image_large = action.payload.image_large;
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
