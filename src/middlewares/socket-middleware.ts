import {
  Middleware,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

import { refreshTokenRequest } from "../utils/refresh-token";
import { RootState } from "../components/app/store";
import { wsAuthConnect, wsAuthDisconnect } from "../services/actions";
import { refreshTokens, removeUserData } from "../services/auth-slice";
import { logoutRequest } from "../utils/logout";

export type ActionTypes = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<any>;
  onConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
  wsActions: ActionTypes,
  withTokenRefresh: boolean = false
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      sendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
      onConnecting,
      disconnect,
    } = wsActions;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(onConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);

          if (
            withTokenRefresh &&
            parseData.message === "Invalid or missing token"
          ) {
            return;
          }

          dispatch(onMessage(parseData));
        };

        socket.onclose = () => {
          dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };
      }

      if (socket && sendMessage?.match(action)) {
        socket.send(JSON.stringify(action.payload));
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};

export const authSocketMiddleware = (
  wsActions: ActionTypes,
  withTokenRefresh: boolean = false
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      sendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
      onConnecting,
      disconnect,
    } = wsActions;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(onConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          dispatch(onMessage(parseData));

          if (
            withTokenRefresh &&
            parseData.message === "Invalid or missing token"
          ) {
            const state = store.getState() as RootState;
            refreshTokenRequest(state.auth.accessToken, state.auth.refreshToken)
              .then((res) => {
                const newToken = res.accessToken.split(" ")[1];
                const newRefreshToken = res.refreshToken;
                const wssUrl = `${url}?token=${newToken}`;
                dispatch(wsAuthConnect(wssUrl));
                dispatch(
                  refreshTokens({
                    accessToken: newToken,
                    refreshToken: newRefreshToken,
                  })
                );
              })
              .catch((err) => {
                dispatch(onError(err.message));
                logoutRequest(state.auth.refreshToken).then(() => {
                  dispatch(removeUserData());
                });
              });
            dispatch(wsAuthDisconnect());
          }
        };

        socket.onclose = () => {
          dispatch(onClose());
          socket = null;

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };
      }

      if (socket && sendMessage?.match(action)) {
        socket.send(JSON.stringify(action.payload));
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;
      }

      return next(action);
    };
  };
};
