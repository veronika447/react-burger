import { request } from "./request";

export const checkEmailRequest = (email) => {
  request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};
