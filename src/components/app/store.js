import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "../../services/burger-constructor-slice";
import ingredientDetailsReducer from "../../services/ingredient-details-slice";
import modalWindowReducer from "../../services/modal-window-slice";
import ingredientsReducer from "../../services/ingredients-slice";
import orderReducer from "../../services/order-slice";
import loginFormReducer from "../../services/login-form-slice";
import registerFormReducer from "../../services/register-form-slice";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    details: ingredientDetailsReducer,
    modalValue: modalWindowReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    loginForm: loginFormReducer,
    registerForm: registerFormReducer,
  },
});
