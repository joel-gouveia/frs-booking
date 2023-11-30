import React, { createContext, useState, ReactNode } from "react";

export const STORAGE_KEY_TOKEN = "@auth_token";
export const STORAGE_KEY_USER = "@auth_user";

interface AuthContextProps {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const value = {
    isAuthenticated,
    isAuthenticating,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
