import reducer from "./login-form-slice";

describe("login form reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      email: "",
      password: "",
    });
  });

  it("should handle loginFormSetValue", () => {
    expect(
      reducer(
        { email: "", password: "" },
        {
          type: "loginForm/loginFormSetValue",
          payload: { field: "email", value: "test email" },
        }
      )
    ).toEqual({
      email: "test email",
      password: "",
    });

    expect(
      reducer(
        { email: "", password: "" },
        {
          type: "loginForm/loginFormSetValue",
          payload: { field: "password", value: "test password" },
        }
      )
    ).toEqual({
      email: "",
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
          type: "loginForm/resetForm",
        }
      )
    ).toEqual({
      email: "",
      password: "",
    });
  });
});
