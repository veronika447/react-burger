import reducer from "./order-feed-slice";

describe("order feed reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      status: "OFFLINE",
      data: null,
      connectionError: null,
    });
  });

  it("should handle wsConnecting", () => {
    const initialState = {
      status: "OFFLINE",
      data: null,
      connectionError: null,
    };

    expect(
      reducer(initialState, {
        type: "orderFeed/wsConnecting",
      })
    ).toEqual({
      status: "CONNECTING...",
      data: null,
      connectionError: null,
    });
  });

  it("should handle wsOpen", () => {
    const initialState = {
      status: "OFFLINE",
      data: null,
      connectionError: null,
    };

    expect(
      reducer(initialState, {
        type: "orderFeed/wsOpen",
      })
    ).toEqual({
      status: "ONLINE",
      data: null,
      connectionError: null,
    });
  });

  it("should handle wsClose", () => {
    const initialState = {
      status: "OFFLINE",
      data: null,
      connectionError: null,
    };

    expect(
      reducer(initialState, {
        type: "orderFeed/wsClose",
      })
    ).toEqual({
      status: "OFFLINE",
      data: null,
      connectionError: null,
    });
  });

  it("should handle wsError", () => {
    const initialState = {
      status: "OFFLINE",
      data: null,
      connectionError: null,
    };

    expect(
      reducer(initialState, {
        type: "orderFeed/wsError",
        payload: "test error",
      })
    ).toEqual({
      status: "OFFLINE",
      data: null,
      connectionError: "test error",
    });
  });

  it("should handle wsMessage", () => {
    const initialState = {
      status: "OFFLINE",
      data: null,
      connectionError: null,
    };
    const message = {
      success: expect.any(Boolean),
      orders: [],
      total: 0,
      totalToday: 0,
    };

    expect(
      reducer(initialState, {
        type: "orderFeed/wsMessage",
        payload: message,
      })
    ).toEqual({
      status: "OFFLINE",
      data: message,
      connectionError: null,
    });
  });
});
