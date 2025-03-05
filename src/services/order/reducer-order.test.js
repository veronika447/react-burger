import reducer, {
  getOrderNumber,
  initialState,
  resetOrderNumber,
} from "./order-slice";

describe("order reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle resetOrderNumber", () => {
    expect(
      reducer(
        { ...initialState, orderNumber: 1 },
        {
          type: resetOrderNumber.type,
        }
      )
    ).toEqual(initialState);
  });

  it("should handle getOrderNumber fulfilled", () => {
    expect(
      reducer(initialState, {
        type: getOrderNumber.fulfilled.type,
        payload: 1,
      })
    ).toEqual({ ...initialState, orderNumber: 1 });
  });

  it("should handle getOrderNumber pending", () => {
    expect(
      reducer(initialState, {
        type: getOrderNumber.pending.type,
      })
    ).toEqual({ ...initialState, orderRequest: true });
  });

  it("should handle getOrderNumber rejected", () => {
    expect(
      reducer(initialState, {
        type: getOrderNumber.rejected.type,
      })
    ).toEqual({ ...initialState, orderFailed: true });
  });
});
