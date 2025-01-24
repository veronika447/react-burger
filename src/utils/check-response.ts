export function checkResponse<T>(res: Response) {
  if (res.ok) {
    return res.json() as T;
  }
  return Promise.reject(res.status);
}
