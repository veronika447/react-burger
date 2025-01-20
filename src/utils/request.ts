import { checkResponse } from "./check-response";
import { BASE_URL } from "../components/app/app";

export function request(endPoint: string, options?: RequestInit): Promise<any> {
  return fetch(BASE_URL + endPoint, options).then(checkResponse);
}
