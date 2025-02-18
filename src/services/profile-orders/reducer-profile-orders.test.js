import reducer from "./profile-orders-slice";

describe("profile orders reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      status: "OFFLINE",
      data: null,
      connectionError: null,
    });
  });

  it("should handle authWsConnecting", () => {
    const initialState = {
      status: "OFFLINE",
      data: null,
      connectionError: null,
    };

    expect(
      reducer(initialState, {
        type: "profileOrders/authWsConnecting",
      })
    ).toEqual({
      status: "CONNECTING...",
      data: null,
      connectionError: null,
    });
  });

  it("should handle authWsOpen", () => {
    const initialState = {
      status: "OFFLINE",
      data: null,
      connectionError: null,
    };

    expect(
      reducer(initialState, {
        type: "profileOrders/authWsOpen",
      })
    ).toEqual({
      status: "ONLINE",
      data: null,
      connectionError: null,
    });
  });

  it("should handle authWsClose", () => {
    const initialState = {
      status: "OFFLINE",
      data: null,
      connectionError: null,
    };

    expect(
      reducer(initialState, {
        type: "profileOrders/authWsClose",
      })
    ).toEqual({
      status: "OFFLINE",
      data: null,
      connectionError: null,
    });
  });

  it("should handle authWsError", () => {
    const initialState = {
      status: "OFFLINE",
      data: null,
      connectionError: null,
    };

    expect(
      reducer(initialState, {
        type: "profileOrders/authWsError",
        payload: "test error",
      })
    ).toEqual({
      status: "OFFLINE",
      data: null,
      connectionError: "test error",
    });
  });

  it("should handle authWsMessage", () => {
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
        type: "profileOrders/authWsMessage",
        payload: message,
      })
    ).toEqual({
      status: "OFFLINE",
      data: message,
      connectionError: null,
    });
  });
});
