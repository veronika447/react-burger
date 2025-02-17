import { request } from "./request";
import { OrderRes } from "./types";

export const getOrder = (number: string) => {
  return request<OrderRes>(`/orders/${number}`, {
    method: "GET",
  });
};
