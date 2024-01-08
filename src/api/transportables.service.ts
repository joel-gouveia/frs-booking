import api from "@api/index";
import { TransportableResponse, TransportablesRequest } from "src/types/models/transportables";

export const getTransportables = async (
  body: TransportablesRequest,
): Promise<TransportableResponse[]> => {
  return api.post("/transportables", body);
};
