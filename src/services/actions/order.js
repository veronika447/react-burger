import { request } from "../../utils/request";
const ORDER_API = "https://norma.nomoreparties.space/api/orders";

export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";

export function getOrderNumber() {
  return function (dispatch, getState) {
    dispatch({
      type: GET_ORDER,
    });
    const order = [
      getState().burgerConstructor.bun._id,
      ...getState().burgerConstructor.ingredients.map((item) => item._id),
      getState().burgerConstructor.bun._id,
    ];
    request(ORDER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ingredients: order }),
    })
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderNumber: res.order.number,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
          error: err,
        });
      });
  };
}
