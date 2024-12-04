import { OPEN_MODAL_WINDOW, CLOSE_MODAL_WINDOW } from "../actions/modal-window";

const initialState = {
  value: null,
};

export const modalStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_WINDOW: {
      return {
        value: action.value,
      };
    }
    case CLOSE_MODAL_WINDOW: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
