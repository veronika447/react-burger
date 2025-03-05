import reducer, {
  initialState,
  resetForm,
  resetPasswordFormSetValue,
} from "./reset-password-form-slice";

describe("reset password form reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle resetPasswordFormSetValue", () => {
    expect(
      reducer(initialState, {
        type: resetPasswordFormSetValue.type,
        payload: { field: "code", value: "test code" },
      })
    ).toEqual({
      ...initialState,
      code: "test code",
    });

    expect(
      reducer(initialState, {
        type: resetPasswordFormSetValue.type,
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
          code: "code",
          password: "password",
        },
        {
          type: resetForm.type,
        }
      )
    ).toEqual(initialState);
  });
});
