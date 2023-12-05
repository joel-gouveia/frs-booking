import { ILoginRes } from "@types/user";
import api from "@api/index";

export const login = async (username: string, password: string): Promise<ILoginRes> => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  return api.post("/users/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
