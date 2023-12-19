import api from "@api/index";
import { DepartureResponse } from "src/types/departure";
import { Booking } from "src/types/models/booking";
import { Receipt } from "src/types/models/receipt";

const BOOKING_BASE_URL = "/bookings";

export const createBooking = async (
  uuid: DepartureResponse["uuid"],
  tickets: { code: string; quantity: number }[],
): Promise<Booking> => {
  return api.post(BOOKING_BASE_URL, { uuid, tickets });
};

export const getReceipt = (bookingNumber: Booking["number"]): Promise<Receipt> => {
  return api.get(`${BOOKING_BASE_URL}/${bookingNumber}/receipt`);
};
