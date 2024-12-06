import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
  RESET_CONSTRUCTOR,
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
        ingredients: [
          ...state.ingredients,
          {
            ...action.payload,
          },
        ],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (element) => element.uniqueId !== action.uniqueId
        ),
      };
    }
    case SORT_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.hoverIndex,
        0,
        ingredients.splice(action.dragIndex, 1)[0]
      );
      return {
        ...state,
        ingredients: ingredients.filter((item) => item),
      };
    }
    case RESET_CONSTRUCTOR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
