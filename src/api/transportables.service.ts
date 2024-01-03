import api from "@api/index";
import { TransportableResponse } from "src/types/transportables";

export const getTransportables = async (
  originCode: string,
  destinationCode: string,
): Promise<TransportableResponse[]> => {
  return api.post("/transportables", { originCode, destinationCode });
};
