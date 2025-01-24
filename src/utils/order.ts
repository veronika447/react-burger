import { request } from "./request";
import type { OrderRes } from "./types";

export const orderRequest = (token: string, order: string[]) => {
  return request<OrderRes>("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ingredients: order }),
  });
};
