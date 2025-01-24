import { request } from "./request";
import type { LogoutRes } from "./types";

export const logoutRequest = (token: string) => {
  return request<LogoutRes>("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: token }),
  });
};
