import { request } from "./request";
import { LoginRes } from "./types";

export const loginRequest = (email: string, password: string) => {
  return request<LoginRes>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};
