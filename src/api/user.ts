import { ILoginRes, UserInfo } from "src/types/user";
import Api from "@api/index";

export const login = async (username: string, password: string): Promise<ILoginRes> => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  return Api.post("/users/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
  Description: Get the user information and operations allowed
 */
export const getMe = async (): Promise<UserInfo> => {
  return Api.get("/users/me");
};
