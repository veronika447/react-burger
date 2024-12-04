import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { ingredientDetailsReducer } from "./ingredient-details";
import { modalStateReducer } from "./modal-window";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  details: ingredientDetailsReducer,
  modal: modalStateReducer,
});
