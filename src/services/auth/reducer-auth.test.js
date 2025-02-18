import reducer from "./auth-slice";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      user: null,
      accessToken: "",
      refreshToken: "",
    });
  });

  it("should handle setUserData", () => {
    expect(
      reducer(
        {},
        {
          type: "user/setUserData",
          payload: {
            user: { name: "Test name", email: "Test email" },
            accessToken: "Test access token",
            refreshToken: "Test refresh token",
          },
        }
      )
    ).toEqual({
      user: { name: "Test name", email: "Test email" },
      accessToken: "Test access token",
      refreshToken: "Test refresh token",
    });
  });

  it("should handle removeUserData", () => {
    expect(
      reducer(
        {
          user: {
            name: "name",
            email: "email",
          },
          refreshToken: "refresh token",
          accessToken: "access token",
        },
        {
          type: "user/removeUserData",
        }
      )
    ).toEqual({
      user: null,
      accessToken: "",
      refreshToken: "",
    });
  });

  it("should handle changeUserInfo", () => {
    expect(
      reducer(
        {
          user: {
            name: "Prev name",
            email: "Prev email",
          },
          refreshToken: "refresh token",
          accessToken: "access token",
        },
        {
          type: "user/changeUserInfo",
          payload: {
            user: {
              name: "Test name",
              email: "Test email",
            },
          },
        }
      )
    ).toEqual({
      user: {
        name: "Test name",
        email: "Test email",
      },
      accessToken: "access token",
      refreshToken: "refresh token",
    });
  });

  it("should handle refreshTokens", () => {
    expect(
      reducer(
        {
          user: {
            name: "name",
            email: "email",
          },
          accessToken: "Prev access token",
          refreshToken: "Prev refresh token",
        },
        {
          type: "user/refreshTokens",
          payload: {
            accessToken: "Test access token",
            refreshToken: "Test refresh token",
          },
        }
      )
    ).toEqual({
      user: {
        name: "name",
        email: "email",
      },
      refreshToken: "Test refresh token",
      accessToken: "Test access token",
    });
  });
});
