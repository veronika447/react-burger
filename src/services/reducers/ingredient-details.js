import { ADD_DETAILS, REMOVE_DETAILS } from "../actions/ingredient-details";

const initialState = {
  src: "",
  name: "",
  calories: "",
  proteins: "",
  fat: "",
  carbohydrates: "",
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DETAILS: {
      return {
        ...state,
        src: action.ingredient.image_large,
        name: action.ingredient.name,
        calories: action.ingredient.calories,
        proteins: action.ingredient.proteins,
        fat: action.ingredient.fat,
        carbohydrates: action.ingredient.carbohydrates,
      };
    }
    case REMOVE_DETAILS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
