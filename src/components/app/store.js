import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import burgerConstructorReducer from "../../services/burger-constructor-slice";
import ingredientDetailsReducer from "../../services/ingredient-details-slice";
import modalWindowReducer from "../../services/modal-window-slice";
import ingredientsReducer from "../../services/ingredients-slice";
import orderReducer from "../../services/order-slice";
import loginFormReducer from "../../services/login-form-slice";
import registerFormReducer from "../../services/register-form-slice";
import forgotPasswordFormReducer from "../../services/forgot-password-form-slice";
import resetPasswordFormReducer from "../../services/reset-password-form-slice";
import authReducer from "../../services/auth-slice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  details: ingredientDetailsReducer,
  modalValue: modalWindowReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  forgotPasswordForm: forgotPasswordFormReducer,
  resetPasswordForm: resetPasswordFormReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
