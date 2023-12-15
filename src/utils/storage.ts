import { storageKeys } from "@constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILoginRes, UserInfo } from "src/types/interfaces/user";

/**
 * Get token and user info from the "local" storage
 */
const getAuthCredentials = async (): Promise<{
  tokenInfo: ILoginRes | null;
  userInfo: UserInfo | null;
}> => {
  const tokenStored = await AsyncStorage.getItem(storageKeys.TOKEN_INFO);
  const userInfoStored = await AsyncStorage.getItem(storageKeys.USER_INFO);

  if (!tokenStored && !userInfoStored) return { tokenInfo: null, userInfo: null };

  const tokenInfo = JSON.parse(tokenStored!) as ILoginRes;
  const userInfo = JSON.parse(userInfoStored!) as UserInfo;

  return { tokenInfo, userInfo };
};

/**
 * Set token and user info to the "local" storage
 */
const setAuthCredentials = async ({
  tokenInfo,
  userInfo,
}: {
  tokenInfo?: ILoginRes;
  userInfo?: UserInfo;
}): Promise<void> => {
  if (tokenInfo) await AsyncStorage.setItem(storageKeys.TOKEN_INFO, JSON.stringify(tokenInfo));
  if (userInfo) await AsyncStorage.setItem(storageKeys.USER_INFO, JSON.stringify(userInfo));
};

/**
 * Clear token and user info from the "local" storage
 */
const clearAuthCredentials = async (): Promise<void> => {
  await AsyncStorage.multiRemove([storageKeys.TOKEN_INFO, storageKeys.USER_INFO]);
};

export const storageUtils = {
  getAuthCredentials,
  setAuthCredentials,
  clearAuthCredentials,
};
