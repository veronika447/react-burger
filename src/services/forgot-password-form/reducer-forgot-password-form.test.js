import reducer from "./forgot-password-form-slice";

describe("forgot password reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      email: "",
    });
  });

  it("should handle forgotPasswordFormSetValue", () => {
    expect(
      reducer(
        { email: "" },
        {
          type: "forgotPasswordForm/forgotPasswordFormSetValue",
          payload: "test email",
        }
      )
    ).toEqual({
      email: "test email",
    });
  });

  it("should handle resetForm", () => {
    expect(
      reducer(
        {
          email: "email",
        },
        {
          type: "forgotPasswordForm/resetForm",
        }
      )
    ).toEqual({
      email: "",
    });
  });
});
