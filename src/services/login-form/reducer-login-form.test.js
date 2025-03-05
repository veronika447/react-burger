import reducer, {
  initialState,
  loginFormSetValue,
  resetForm,
} from "./login-form-slice";

describe("login form reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle loginFormSetValue", () => {
    expect(
      reducer(initialState, {
        type: loginFormSetValue.type,
        payload: { field: "email", value: "test email" },
      })
    ).toEqual({
      ...initialState,
      email: "test email",
    });

    expect(
      reducer(initialState, {
        type: loginFormSetValue.type,
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
