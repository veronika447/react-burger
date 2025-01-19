import { request } from "./request";

export const resetPasswordRequest = (password, token) => {
  return request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ password: password, token: token }),
  });
};
