import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "ORDER_FEED_CONNECT">(
  "ORDER_FEED_CONNECT"
);

export const wsDisconnect = createAction("ORDER_FEED_DISCONNECT");

export const wsAuthConnect = createAction<string, "PROFILE_ORDER_CONNECT">(
  "PROFILE_ORDER_CONNECT"
);

export const wsAuthDisconnect = createAction("PROFILE_ORDER_DISCONNECT");

export type WsExternalActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsDisconnect>;

export type WsAuthExternalActions =
  | ReturnType<typeof wsAuthConnect>
  | ReturnType<typeof wsAuthDisconnect>;
