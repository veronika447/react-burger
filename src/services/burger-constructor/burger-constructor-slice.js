import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: {
      prepare: (ingredient) => {
        return { payload: { ...ingredient, uniqueId: v4() } };
      },
      reducer: (state, action) => {
        state.ingredients.push(action.payload);
      },
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uniqueId !== action.payload
      );
    },
    sortIngredients: (state, action) => {
      state.ingredients.splice(
        action.payload.hoverIndex,
        0,
        state.ingredients.splice(action.payload.dragIndex, 1)[0]
      );
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addBun,
  addIngredient,
  deleteIngredient,
  sortIngredients,
  resetConstructor,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;