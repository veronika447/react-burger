import { request } from "./request";

export const refreshTokenRequest = (token) => {
  return request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: token }),
  });
};
