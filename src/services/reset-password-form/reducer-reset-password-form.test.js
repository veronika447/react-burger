import reducer from "./reset-password-form-slice";

describe("reset password form reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      password: "",
      code: "",
    });
  });

  it("should handle resetPasswordFormSetValue", () => {
    expect(
      reducer(
        { password: "", code: "" },
        {
          type: "resetPasswordForm/resetPasswordFormSetValue",
          payload: { field: "code", value: "test code" },
        }
      )
    ).toEqual({
      code: "test code",
      password: "",
    });

    expect(
      reducer(
        { code: "", password: "" },
        {
          type: "resetPasswordForm/resetPasswordFormSetValue",
          payload: { field: "password", value: "test password" },
        }
      )
    ).toEqual({
      code: "",
      password: "test password",
    });
  });

  it("should handle resetForm", () => {
    expect(
      reducer(
        {
          code: "code",
          password: "password",
        },
        {
          type: "resetPasswordForm/resetForm",
        }
      )
    ).toEqual({
      code: "",
      password: "",
    });
  });
});
