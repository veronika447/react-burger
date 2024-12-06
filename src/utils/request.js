import { checkResponse } from "./checkResponse";
import { BASE_URL } from "../components/app/app";

export function request(endPoint, options) {
  return fetch(BASE_URL + endPoint, options).then(checkResponse);
}
