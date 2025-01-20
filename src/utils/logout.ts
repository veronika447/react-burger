import { request } from "./request";

export const logoutRequest = (token: string) => {
  return request("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: token }),
  });
};
