import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { ingredientDetailsReducer } from "./modal-window";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  details: ingredientDetailsReducer,
});
