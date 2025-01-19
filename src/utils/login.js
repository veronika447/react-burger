import { request } from "./request";

export const loginRequest = (email, password) => {
  request("/auth/login", {
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
