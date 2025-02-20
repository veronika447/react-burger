import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils/request";
import { GetIngredientsRes, IngredientType } from "../../utils/types";

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
  ingredients: Record<string, IngredientType> | null;
};

export const initialState: IngredientState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: null,
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
        let ingredients: IngredientState["ingredients"] = null;
        if (action.payload && action.payload.length) {
          const ingredientsKV = action.payload.reduce<
            Record<string, IngredientType>
          >((acc, el) => {
            acc[el._id] = el;
            return acc;
          }, {});
          ingredients = ingredientsKV;
        }
        state.ingredients = ingredients;
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
