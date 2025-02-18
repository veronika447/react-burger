import reducer from "./modal-window-slice";

describe("modal window reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      value: null,
    });
  });

  it("should handle changeValue", () => {
    expect(
      reducer(
        {
          value: null,
        },
        { type: "modalValue/changeValue", payload: "test value" }
      )
    ).toEqual({
      value: "test value",
    });
  });
});
