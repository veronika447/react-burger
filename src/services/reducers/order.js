import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER,
} from "../actions/order";

const initialState = {};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return {};
    }
    case GET_ORDER_FAILED: {
      return {};
    }
    case GET_ORDER_SUCCESS: {
      return {};
    }
    case UPDATE_ORDER: {
      return {};
    }
    default: {
      return state;
    }
  }
};
