import { request } from "./request";
import { ResetPasswordRes } from "./types";

export const resetPasswordRequest = (password: string, token: string) => {
  return request<ResetPasswordRes>("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ password: password, token: token }),
  });
};
