import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { type IngredientType } from "../../utils/types";
import type { PayloadAction } from "@reduxjs/toolkit";

type BurgerConstructorState = {
  bun: null | IngredientType;
  ingredients: IngredientType[];
};

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<IngredientType>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      prepare: (ingredient: IngredientType) => {
        return { payload: { ...ingredient, uniqueId: v4() } };
      },
      reducer: (state, action: PayloadAction<IngredientType>) => {
        state.ingredients.push(action.payload);
      },
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uniqueId && item.uniqueId !== action.payload
      );
    },
    sortIngredients: (
      state,
      action: PayloadAction<{ hoverIndex: number; dragIndex: number }>
    ) => {
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
