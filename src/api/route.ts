import api from "@api/index";
import { IRoute } from "@types/route";

export const getRoutes = async (): Promise<IRoute[]> => {
  return api.get("/routes");
};
