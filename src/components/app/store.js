import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "../../services/burger-constructor/burger-constructor-slice";
import ingredientDetailsReducer from "../../services/ingredient-details/ingredient-details-slice";
import modalWindowReducer from "../../services/modal-window/modal-window-slice";
import ingredientsReducer from "../../services/ingredients/ingredients-slice";
import orderReducer from "../../services/order/order-slice";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    details: ingredientDetailsReducer,
    modalValue: modalWindowReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
  },
});
