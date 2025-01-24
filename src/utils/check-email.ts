import { request } from "./request";
import type { CheckEmailRes } from "./types";

export const checkEmailRequest = (email: string) => {
  return request<CheckEmailRes>("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};
