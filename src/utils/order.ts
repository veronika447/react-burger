import { request } from "./request";

export const orderRequest = (token: string, order: number) => {
  return request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ingredients: order }),
  });
};
