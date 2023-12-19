import api from "@api/index";
import { DepartureResponse } from "src/types/departure";
import { Booking } from "src/types/models/booking";
import { Receipt } from "src/types/models/receipt";
import { Ticket } from "src/types/models/ticket";

const BOOKING_BASE_URL = "/bookings";

export const createBooking = async (
  uuid: DepartureResponse["uuid"],
  tickets: Ticket[],
): Promise<Booking> => {
  return api.post(BOOKING_BASE_URL, { uuid, tickets });
};

export const getReceipt = (bookingNumber: Booking["number"]): Promise<Receipt> => {
  return api.get(`${BOOKING_BASE_URL}/${bookingNumber}/receipt`);
};
