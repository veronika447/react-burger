import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./burger-constructor";
import { ingredientDetailsReducer } from "./ingredient-details";
import { modalValueReducer } from "./modal-window";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  details: ingredientDetailsReducer,
  modalValue: modalValueReducer,
  order: orderReducer,
});
