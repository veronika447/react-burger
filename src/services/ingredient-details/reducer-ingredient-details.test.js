import reducer from "./ingredient-details-slice";

describe("ingredient details reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      image_large: "",
      name: "",
      calories: 0,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
    });
  });

  it("should handle addDetails", () => {
    const prevDetails = {
      image_large: "",
      name: "",
      calories: 0,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
    };

    const newDetails = {
      image_large: "test image",
      name: "test name",
      calories: 0,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
    };

    expect(
      reducer(prevDetails, {
        type: "details/addDetails",
        payload: newDetails,
      })
    ).toEqual(newDetails);
  });
});
