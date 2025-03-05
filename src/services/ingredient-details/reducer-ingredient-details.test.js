import reducer, { addDetails, initialState } from "./ingredient-details-slice";

describe("ingredient details reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle addDetails", () => {
    const newDetails = {
      image_large: "test image",
      name: "test name",
      calories: 0,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
    };

    expect(
      reducer(initialState, {
        type: addDetails.type,
        payload: newDetails,
      })
    ).toEqual(newDetails);
  });
});
