import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/request";
import { GetIngredientsRes, IngredientType } from "../utils/types";

export const getIngredients = createAsyncThunk(
  "ingredients/ingredients",
  async () => {
    const response = await request<GetIngredientsRes>("/ingredients");
    return response.data;
  }
);

type IngredientState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: Map<string, IngredientType>;
};

const initialState: IngredientState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: new Map(),
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsFailed = false;
        state.ingredientsRequest = false;
        const ingredientsMap = new Map();
        action.payload?.forEach((el) => ingredientsMap.set(el._id, el));
        state.ingredients = ingredientsMap;
      })
      .addCase(getIngredients.pending, (state) => {
        state.ingredientsFailed = false;
        state.ingredientsRequest = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredientsFailed = true;
        state.ingredientsRequest = false;
      });
  },
});

export default ingredientsSlice.reducer;
