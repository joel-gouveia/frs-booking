import { act, renderHook } from "@testing-library/react-native";
import { storageUtils } from "@utils/storage";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { userMocks } from "@mocks/index";
import * as API from "@api/user";
import { useAuth } from "@hooks/useAuth";
import { AuthContextProvider } from "../auth";

describe("context/auth", () => {
  const { userInfo, tokenInfo, loginInfo } = userMocks;

  beforeEach(async () => {
    await storageUtils.clearAuthCredentials();
  });

  it("should load data from storage correctly with loadStorageData", async () => {
    await storageUtils.setAuthCredentials({ userInfo, tokenInfo });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider });

    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoadingAuth).toBe(false);

    await act(async () => result.current.loadStorageData());

    expect(result.current.token).toEqual(tokenInfo);
    expect(result.current.user).toEqual(userInfo);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoadingAuth).toBe(false);
  });

  it("should handle logout and erase storage data", async () => {
    await storageUtils.setAuthCredentials({ userInfo, tokenInfo });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider });

    await act(async () => result.current.loadStorageData());

    expect(result.current.token).toEqual(tokenInfo);
    expect(result.current.user).toEqual(userInfo);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoadingAuth).toBe(false);

    await act(async () => result.current.logout());

    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoadingAuth).toBe(false);

    const { tokenInfo: tokenInfoAfterLogout, userInfo: userInfoAfterLogout } =
      await storageUtils.getAuthCredentials();

    expect(tokenInfoAfterLogout).toBeNull();
    expect(userInfoAfterLogout).toBeNull();
  });

  it("should set user and token after successfully authenticating", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider });

    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);

    jest.spyOn(API, "login").mockResolvedValue(tokenInfo);
    jest.spyOn(API, "getMe").mockResolvedValue(userInfo);

    await act(async () =>
      result.current
        .authenticate(loginInfo.username, loginInfo.password)
        .then(() => expect(result.current.isLoadingAuth).toBe(true)),
    );

    expect(result.current.token).toEqual(tokenInfo);
    expect(result.current.user).toEqual(userInfo);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoadingAuth).toBe(false);
  });

  it("should not set token neither user if login fails", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider });

    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);

    jest.spyOn(API, "getMe").mockResolvedValue(userInfo);
    jest.spyOn(API, "login").mockRejectedValue(new Error());

    await act(async () =>
      result.current
        .authenticate(loginInfo.username, loginInfo.password)
        .then(() => expect(result.current.isLoadingAuth).toBe(true)),
    );

    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoadingAuth).toBe(false);
  });

  it("should not set token neither user if getMe fails", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider });

    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);

    jest.spyOn(API, "login").mockResolvedValue(tokenInfo);
    jest.spyOn(API, "getMe").mockRejectedValue(new Error());

    await act(async () =>
      result.current
        .authenticate(loginInfo.username, loginInfo.password)
        .then(() => expect(result.current.isLoadingAuth).toBe(true)),
    );

    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoadingAuth).toBe(false);
  });

  it("should not set token neither user if authentication fails", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider });

    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);

    jest.spyOn(API, "login").mockRejectedValue(new Error());
    jest.spyOn(API, "getMe").mockRejectedValue(new Error());

    await act(async () =>
      result.current
        .authenticate(loginInfo.username, loginInfo.password)
        .then(() => expect(result.current.isLoadingAuth).toBe(true)),
    );

    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoadingAuth).toBe(false);
  });

  // WARN: This test might not be necessary. But if we use the authenticate method to re-login the user
  //       after the token expires, then we should test this. In this case, if the re-login fails.
  it("should clear auth data from storage if authentication fails", async () => {
    await storageUtils.setAuthCredentials({ userInfo, tokenInfo });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider });

    await act(async () => result.current.loadStorageData());

    expect(result.current.token).toEqual(tokenInfo);
    expect(result.current.user).toEqual(userInfo);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoadingAuth).toBe(false);

    jest.spyOn(API, "login").mockRejectedValue(new Error());
    jest.spyOn(API, "getMe").mockRejectedValue(new Error());

    await act(async () =>
      result.current
        .authenticate(loginInfo.username, loginInfo.password)
        .then(() => expect(result.current.isLoadingAuth).toBe(true)),
    );

    const { tokenInfo: tokenInfoAfterLogout, userInfo: userInfoAfterLogout } =
      await storageUtils.getAuthCredentials();

    expect(tokenInfoAfterLogout).toBeNull();
    expect(userInfoAfterLogout).toBeNull();
  });
});
