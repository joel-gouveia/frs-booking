import api from "@api/index";
import { Price, PriceRequest } from "src/types/models/price";

/**
 * Get total price of all tickets in a booking
 */
export const getTotalPrice = async (body: PriceRequest): Promise<Price> => {
  return api.post("/price", body);
};
