import { checkResponse } from "./check-response";
import { BASE_URL } from "../components/app/app";

export async function request<T>(
  endPoint: string,
  options?: RequestInit
): Promise<T> {
  return fetch(BASE_URL + endPoint, options).then(checkResponse<T>);
}
