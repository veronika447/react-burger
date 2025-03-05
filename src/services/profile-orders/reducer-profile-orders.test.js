import reducer, {
  authWsClose,
  authWsConnecting,
  authWsError,
  authWsMessage,
  authWsOpen,
  initialState,
} from "./profile-orders-slice";

describe("profile orders reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle authWsConnecting", () => {
    expect(
      reducer(initialState, {
        type: authWsConnecting.type,
      })
    ).toEqual({
      ...initialState,
      status: "CONNECTING...",
    });
  });

  it("should handle authWsOpen", () => {
    expect(
      reducer(initialState, {
        type: authWsOpen.type,
      })
    ).toEqual({
      ...initialState,
      status: "ONLINE",
    });
  });

  it("should handle authWsClose", () => {
    expect(
      reducer(initialState, {
        type: authWsClose.type,
      })
    ).toEqual(initialState);
  });

  it("should handle authWsError", () => {
    expect(
      reducer(initialState, {
        type: authWsError.type,
        payload: "test error",
      })
    ).toEqual({
      ...initialState,
      connectionError: "test error",
    });
  });

  it("should handle authWsMessage", () => {
    const message = {
      success: expect.any(Boolean),
      orders: [],
      total: 0,
      totalToday: 0,
    };

    expect(
      reducer(initialState, {
        type: authWsMessage.type,
        payload: message,
      })
    ).toEqual({
      ...initialState,
      data: message,
    });
  });
});
