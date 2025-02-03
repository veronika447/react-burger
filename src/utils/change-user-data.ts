import { request } from "./request";
import type { ChangeUserDataRes } from "./types";

export const changeUserDataRequest = (
  token: string,
  name: string,
  email: string
) => {
  return request<ChangeUserDataRes>("/auth/user", {
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
