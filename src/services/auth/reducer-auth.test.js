import reducer, {
  changeUserInfo,
  initialState,
  refreshTokens,
  removeUserData,
  setUserData,
} from "./auth-slice";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setUserData", () => {
    expect(
      reducer(
        {},
        {
          type: setUserData.type,
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
          type: removeUserData.type,
        }
      )
    ).toEqual(initialState);
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
          type: changeUserInfo.type,
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
          type: refreshTokens.type,
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
