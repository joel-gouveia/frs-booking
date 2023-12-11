import React, { createContext, useState, ReactNode } from "react";
import { login as loginApi } from "@api/user";

export const STORAGE_KEY_TOKEN = "@auth_token";
export const STORAGE_KEY_USER = "@auth_user";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    // TODO: Set the access token
    try {
      setIsLoading(true);
      await loginApi(username, password);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
