import reducer from "./register-form-slice";

describe("register form reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      name: "",
      email: "",
      password: "",
    });
  });

  it("should handle registerFormSetValue", () => {
    expect(
      reducer(
        { name: "", email: "", password: "" },
        {
          type: "registerForm/registerFormSetValue",
          payload: { field: "name", value: "test name" },
        }
      )
    ).toEqual({
      name: "test name",
      email: "",
      password: "",
    });

    expect(
      reducer(
        { name: "", email: "", password: "" },
        {
          type: "registerForm/registerFormSetValue",
          payload: { field: "email", value: "test email" },
        }
      )
    ).toEqual({
      name: "",
      email: "test email",
      password: "",
    });

    expect(
      reducer(
        { name: "", email: "", password: "" },
        {
          type: "registerForm/registerFormSetValue",
          payload: { field: "password", value: "test password" },
        }
      )
    ).toEqual({
      name: "",
      email: "",
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
          type: "registerForm/resetForm",
        }
      )
    ).toEqual({
      name: "",
      email: "",
      password: "",
    });
  });
});
