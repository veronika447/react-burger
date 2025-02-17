import {
  combineReducers,
  configureStore,
  ThunkDispatch,
} from "@reduxjs/toolkit";
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
import orderFeedReducer, {
  WsInternalActions,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "../../services/order-feed-slice";
import profileOrdersReducer, {
  authWsClose,
  authWsConnecting,
  authWsError,
  authWsMessage,
  authWsOpen,
  WsAuthInternalActions,
} from "../../services/profile-orders-slice";
import {
  socketMiddleware,
  authSocketMiddleware,
} from "../../middlewares/socket-middleware";
import {
  WsExternalActions,
  wsConnect,
  wsDisconnect,
  wsAuthConnect,
  wsAuthDisconnect,
  WsAuthExternalActions,
} from "../../services/actions";

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
  orderFeed: orderFeedReducer,
  profileOrders: profileOrdersReducer,
});

const orderFeedMiddleware = socketMiddleware(
  {
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
  },
  false
);

const profileOrderMiddleware = authSocketMiddleware(
  {
    connect: wsAuthConnect,
    disconnect: wsAuthDisconnect,
    onConnecting: authWsConnecting,
    onOpen: authWsOpen,
    onClose: authWsClose,
    onError: authWsError,
    onMessage: authWsMessage,
  },
  true
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoredPaths: ["ingredients.ingredients"],
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(orderFeedMiddleware, profileOrderMiddleware),
});

export const persistor = persistStore(store);

type ApplicationActions =
  | WsExternalActions
  | WsInternalActions
  | WsAuthExternalActions
  | WsAuthInternalActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, any, ApplicationActions>;
