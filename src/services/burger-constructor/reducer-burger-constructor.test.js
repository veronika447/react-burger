import { v4 } from "uuid";
import reducer, { addIngredient } from "./burger-constructor-slice";
import { configureStore } from "@reduxjs/toolkit";

describe("burger constructor reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  const newBun = {
    _id: "Test id",
    name: "Test name",
    type: "bun",
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

  const prevBun = {
    _id: "Prev id",
    name: "Prev name",
    type: "bun",
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

  it("should handle addBun", () => {
    expect(
      reducer(
        { bun: null, ingredients: [] },
        {
          type: "burgerConstructor/addBun",
          payload: newBun,
        }
      )
    ).toEqual({
      bun: newBun,
      ingredients: [],
    });

    expect(
      reducer(
        {
          bun: prevBun,
          ingredients: [],
        },
        {
          type: "burgerConstructor/addBun",
          payload: newBun,
        }
      )
    ).toEqual({
      bun: newBun,
      ingredients: [],
    });
  });

  it("should returns an addIngredient action object with prepared payload", () => {
    const newIngredient = {
      _id: "Test id",
      name: "Test name",
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
    expect(addIngredient(newIngredient)).toEqual({
      type: "burgerConstructor/addIngredient",
      payload: {
        uniqueId: expect.any(String),
        _id: "Test id",
        name: "Test name",
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
      },
    });
  });

  it("should add an ingredient", () => {
    const newIngredient = {
      uniqueId: v4(),
      _id: "Test id",
      name: "Test name",
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
      reducer(
        {
          bun: null,
          ingredients: [],
        },
        {
          type: "burgerConstructor/addIngredient",
          payload: newIngredient,
        }
      )
    ).toEqual({
      bun: null,
      ingredients: [
        {
          uniqueId: expect.any(String),
          _id: "Test id",
          name: "Test name",
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
        },
      ],
    });
  });

  it("should add an ingredient - 2", () => {
    const newIngredient = {
      _id: "Test id",
      name: "Test name",
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
    const store = configureStore({ reducer: reducer });
    store.dispatch(addIngredient(newIngredient));
    expect(store.getState()).toEqual({
      bun: null,
      ingredients: [
        {
          uniqueId: expect.any(String),
          _id: "Test id",
          name: "Test name",
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
        },
      ],
    });
  });

  it("should handle deleteIngredient", () => {
    const ingredients = [
      {
        uniqueId: expect.any(String),
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
      },
      {
        uniqueId: "Test uniqueId",
        _id: "Test id",
        name: "Test name",
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
      },
    ];
    expect(
      reducer(
        { bun: null, ingredients: ingredients },
        {
          type: "burgerConstructor/deleteIngredient",
          payload: "Test uniqueId",
        }
      )
    ).toEqual({
      bun: null,
      ingredients: [
        {
          uniqueId: expect.any(String),
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
        },
      ],
    });
  });

  it("should handle sortIngredients", () => {
    const ingredient1 = {
      uniqueId: expect.any(String),
      _id: "Test id1",
      name: "Test name",
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

    const ingredient2 = {
      uniqueId: expect.any(String),
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

    const ingredient3 = {
      uniqueId: expect.any(String),
      _id: "Test id2",
      name: "Test name",
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
      reducer(
        {
          bun: null,
          ingredients: [ingredient1, ingredient2, ingredient3],
        },
        {
          type: "burgerConstructor/sortIngredients",
          payload: { hoverIndex: 2, dragIndex: 0 },
        }
      )
    ).toEqual({
      bun: null,
      ingredients: [ingredient2, ingredient3, ingredient1],
    });
  });

  it("should handle resetConstructor", () => {
    const bun = {
      _id: "id",
      name: "name",
      type: "bun",
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
    const ingredient = {
      uniqueId: expect.any(String),
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
      reducer(
        {
          bun: bun,
          ingredients: [ingredient],
        },
        {
          type: "burgerConstructor/resetConstructor",
        }
      )
    ).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
