import reducer, {
  forgotPasswordFormSetValue,
  initialState,
  resetForm,
} from "./forgot-password-form-slice";

describe("forgot password reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle forgotPasswordFormSetValue", () => {
    expect(
      reducer(initialState, {
        type: forgotPasswordFormSetValue.type,
        payload: "test email",
      })
    ).toEqual({
      ...initialState,
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
          type: resetForm.type,
        }
      )
    ).toEqual(initialState);
  });
});
