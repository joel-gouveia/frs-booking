import React, { createContext, useState, ReactNode } from "react";
import { login as loginApi } from "@api/user";

export const STORAGE_KEY_TOKEN = "@auth_token";
export const STORAGE_KEY_USER = "@auth_user";

interface AuthContextProps {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: (username: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    // TODO: Set the access token
    try {
      setIsAuthenticating(true);
      await loginApi(username, password);
      setIsAuthenticated(true);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const value = {
    isAuthenticated,
    isAuthenticating,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
