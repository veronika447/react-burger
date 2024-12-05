import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_BUN,
  DELETE_INGREDIENT,
} from "../actions/burger-constructor";

const initialState = {
  bun: null,
  ingredients: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    }
    case DELETE_BUN: {
      return {
        ...state,
        bun: initialState.bun,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (element) => element._id !== action.ingredient._id
        ),
      };
    }
    default: {
      return state;
    }
  }
};
