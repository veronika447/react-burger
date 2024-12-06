import { CHANGE_VALUE } from "../actions/modal-window";

const initialState = {
  value: null,
};

export const modalValueReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VALUE: {
      return {
        value: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
