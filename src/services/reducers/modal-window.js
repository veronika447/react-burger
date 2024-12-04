import {
  ADD_DETAILS,
  REMOVE_DETAILS,
  OPEN_ORDER_WINDOW,
} from "../actions/modal-window";

const initialState = {
  window: null,
  info: {
    src: "",
    name: "",
    calories: "",
    proteins: "",
    fat: "",
    carbohydrates: "",
  },
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DETAILS: {
      return {
        ...state,
        window: "ingredient",
        info: {
          ...state.info,
          src: action.ingredient.image_large,
          name: action.ingredient.name,
          calories: action.ingredient.calories,
          proteins: action.ingredient.proteins,
          fat: action.ingredient.fat,
          carbohydrates: action.ingredient.carbohydrates,
        },
      };
    }
    case REMOVE_DETAILS: {
      return initialState;
    }
    case OPEN_ORDER_WINDOW: {
      return {
        ...initialState,
        window: "order",
      };
    }
    default: {
      return state;
    }
  }
};
