export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else if (res.status === 401) {

  }
  return Promise.reject(res.status);
}
