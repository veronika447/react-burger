import reducer, {
  initialState,
  registerFormSetValue,
  resetForm,
} from "./register-form-slice";

describe("register form reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle registerFormSetValue", () => {
    expect(
      reducer(initialState, {
        type: registerFormSetValue.type,
        payload: { field: "name", value: "test name" },
      })
    ).toEqual({
      ...initialState,
      name: "test name",
    });

    expect(
      reducer(initialState, {
        type: registerFormSetValue.type,
        payload: { field: "email", value: "test email" },
      })
    ).toEqual({
      ...initialState,
      email: "test email",
    });

    expect(
      reducer(initialState, {
        type: registerFormSetValue.type,
        payload: { field: "password", value: "test password" },
      })
    ).toEqual({
      ...initialState,
      password: "test password",
    });
  });

  it("should handle resetForm", () => {
    expect(
      reducer(
        {
          name: "name",
          email: "email",
          password: "password",
        },
        {
          type: resetForm.type,
        }
      )
    ).toEqual(initialState);
  });
});
