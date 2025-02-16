import { request } from "./request";
import type { RefreshTokenRes } from "./types";

export const refreshTokenRequest = (
  accessToken: string,
  refreshToken: string
) => {
  return request<RefreshTokenRes>("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ token: refreshToken }),
  });
};
