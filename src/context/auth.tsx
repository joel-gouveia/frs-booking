import React, { createContext, useState, ReactNode, useCallback } from "react";

import { login, getMe } from "@api/user";
import { ILoginRes, UserInfo } from "src/types/user";
import { storageUtils } from "@utils/storage";

interface AuthContextProps {
  loadStorageData: () => Promise<void>;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  authenticate: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  token: ILoginRes | null;
  user: UserInfo | null;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [token, setToken] = useState<ILoginRes | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  /**
   * Load token and user info from the storage
   */
  const loadStorageData = useCallback(async () => {
    try {
      setIsLoadingAuth(true);

      const { tokenInfo, userInfo } = await storageUtils.getAuthCredentials();

      if (tokenInfo && userInfo) {
        setToken(tokenInfo);
        setUser(userInfo);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const authenticate = async (username: string, password: string) => {
    try {
      setIsLoadingAuth(true);

      const tokenInfo = await login(username, password);
      await storageUtils.setAuthCredentials({ tokenInfo });

      const userInfo = await getMe();
      await storageUtils.setAuthCredentials({ userInfo });

      if (tokenInfo && userInfo) {
        setToken(tokenInfo);
        setUser(userInfo);

        setIsAuthenticated(true);
      }
    } catch (error) {
      await storageUtils.clearAuthCredentials();
      setIsAuthenticated(false);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  async function logout() {
    await storageUtils.clearAuthCredentials();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }

  const value = {
    loadStorageData,
    isAuthenticated,
    isLoadingAuth,
    authenticate,
    logout,
    token,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
