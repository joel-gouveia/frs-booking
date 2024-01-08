import api from "@api/index";
import { RouteResponse } from "src/types/models/route";

export const getRoutes = async (): Promise<RouteResponse[]> => {
  return api.get("/routes");
};
