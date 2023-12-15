import { ILoginRes, UserInfo } from "src/types/models/user";
import Api from "@api/index";

const USERS_BASE_URL = "/users";

export const login = async (username: string, password: string): Promise<ILoginRes> => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  return Api.post(`${USERS_BASE_URL}/login`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
  Description: Get the user information and operations allowed
 */
export const getMe = async (): Promise<UserInfo> => {
  return Api.get(`${USERS_BASE_URL}/me`);
};
