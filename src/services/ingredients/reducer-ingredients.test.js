import reducer, { getIngredients, initialState } from "./ingredients-slice";

describe("ingredients reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle getIngredients fulfilled", () => {
    const ingredient = {
      _id: "id",
      name: "name",
      type: "main",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "image",
      image_mobile: "image-mobile",
      image_large: "image-large",
      __v: 0,
    };
    expect(
      reducer(initialState, {
        type: getIngredients.fulfilled.type,
        payload: [ingredient],
      })
    ).toEqual({ ...initialState, ingredients: { id: ingredient } });
  });

  it("should handle getIngredients pending", () => {
    expect(
      reducer(initialState, {
        type: getIngredients.pending.type,
      })
    ).toEqual({ ...initialState, ingredientsRequest: true });
  });

  it("should handle getIngredients reject", () => {
    expect(
      reducer(initialState, {
        type: getIngredients.rejected.type,
      })
    ).toEqual({ ...initialState, ingredientsFailed: true });
  });
});
