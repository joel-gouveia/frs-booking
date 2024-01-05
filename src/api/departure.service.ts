import api from "@api/index";
import { DepartureRequest, DepartureResponse } from "src/types/models/departure";

export const getDepartures = async (body: DepartureRequest): Promise<DepartureResponse[]> => {
  return api.post("/departures", body);
};
