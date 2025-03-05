import reducer, {
  initialState,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./order-feed-slice";

describe("order feed reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle wsConnecting", () => {
    expect(
      reducer(initialState, {
        type: wsConnecting.type,
      })
    ).toEqual({
      ...initialState,
      status: "CONNECTING...",
    });
  });

  it("should handle wsOpen", () => {
    expect(
      reducer(initialState, {
        type: wsOpen.type,
      })
    ).toEqual({
      ...initialState,
      status: "ONLINE",
    });
  });

  it("should handle wsClose", () => {
    expect(
      reducer(initialState, {
        type: wsClose.type,
      })
    ).toEqual(initialState);
  });

  it("should handle wsError", () => {
    expect(
      reducer(initialState, {
        type: wsError.type,
        payload: "test error",
      })
    ).toEqual({
      ...initialState,
      connectionError: "test error",
    });
  });

  it("should handle wsMessage", () => {
    const message = {
      success: expect.any(Boolean),
      orders: [],
      total: 0,
      totalToday: 0,
    };

    expect(
      reducer(initialState, {
        type: wsMessage.type,
        payload: message,
      })
    ).toEqual({
      ...initialState,
      data: message,
    });
  });
});
