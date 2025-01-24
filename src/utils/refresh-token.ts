import { request } from "./request";
import type { RefreshTokenRes } from "./types";

export const refreshTokenRequest = (token: string) => {
  return request<RefreshTokenRes>("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: token }),
  });
};
