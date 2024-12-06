import { v4 } from "uuid";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SORT_INGREDIENT = "SORT_INGREDIENT";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export const addIngredient = (item) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...item,
      uniqueId: v4(),
    },
  };
};
