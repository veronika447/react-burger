import { request } from "./request";
import type { OrderNumberRes } from "./types";

export const orderRequest = (token: string, order: string[]) => {
  return request<OrderNumberRes>("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ingredients: order }),
  });
};
