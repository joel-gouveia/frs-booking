import api from "@api/index";
import { DepartureRequest, DepartureResponse } from "src/types/departure";

export const getDepartures = async (body: DepartureRequest): Promise<DepartureResponse[]> => {
  return api.post("/departures", body);
};
