import { API_URL } from "../../components/app/app";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });

    fetch(API_URL)
      .then((res) => {
        if (res && res.ok) {
          res.json().then((res) => {
            dispatch({
              type: GET_INGREDIENTS_SUCCESS,
              ingredients: res.data,
            });
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
            error: res.status,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: err.message,
        });
      });
  };
}
