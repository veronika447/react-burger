import reducer, { changeValue, initialState } from "./modal-window-slice";

describe("modal window reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle changeValue", () => {
    expect(
      reducer(initialState, {
        type: changeValue.type,
        payload: "test value",
      })
    ).toEqual({
      value: "test value",
    });
  });
});
