import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./burger-constructor";
import { ingredientDetailsReducer } from "./ingredient-details";
import { modalStateReducer } from "./modal-window";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  details: ingredientDetailsReducer,
  modal: modalStateReducer,
});
