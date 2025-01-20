import { request } from "./request";

export const registerRequest = (
  email: string,
  password: string,
  name: string
) => {
  return request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};
