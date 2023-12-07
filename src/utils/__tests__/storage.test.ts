import { describe, expect, it } from "@jest/globals";
import { userMocks } from "@mocks/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { storageKeys } from "@constants/storageKeys";
import { storageUtils } from "..";

describe("utils/storage", () => {
  const { userInfo, tokenInfo } = userMocks;

  it("should store token info", async () => {
    storageUtils.setAuthCredentials({ tokenInfo });
    expect(AsyncStorage.setItem).toBeCalledWith(storageKeys.TOKEN_INFO, JSON.stringify(tokenInfo));
  });

  it("should store user info", async () => {
    storageUtils.setAuthCredentials({ userInfo });
    expect(AsyncStorage.setItem).toBeCalledWith(storageKeys.USER_INFO, JSON.stringify(userInfo));
  });

  it("should get token info", async () => {
    storageUtils.getAuthCredentials();
    expect(AsyncStorage.getItem).toBeCalledWith(storageKeys.TOKEN_INFO);
  });

  it("should get user info", async () => {
    storageUtils.getAuthCredentials();
    expect(AsyncStorage.getItem).toBeCalledWith(storageKeys.USER_INFO);
  });

  it("should remove token and user info", async () => {
    storageUtils.clearAuthCredentials();
    expect(AsyncStorage.multiRemove).toBeCalledWith([
      storageKeys.TOKEN_INFO,
      storageKeys.USER_INFO,
    ]);

    const { tokenInfo: tokenStored, userInfo: userStored } =
      await storageUtils.getAuthCredentials();

    expect(tokenStored).toBeNull();
    expect(userStored).toBeNull();
  });
});
