import { request } from "./request";

export const changeUserDataRequest = (token, name, email) => {
  return request("/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  });
};
