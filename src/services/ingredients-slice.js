import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/request";

export const getIngredients = createAsyncThunk(
  "ingredients/ingredients",
  async () => {
    const response = await request("/ingredients");
    return await response.data;
  }
);

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsFailed = false;
        state.ingredientsRequest = false;
        state.ingredients = action.payload;
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
