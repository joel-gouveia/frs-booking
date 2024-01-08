import { Booking } from "src/types/models/booking";
import { Ticket } from "src/types/models/ticket";

const tickets: Ticket[] = [
  { code: "AD", quantity: 2 },
  { code: "CH", quantity: 1 },
];

const booking: Booking = {
  number: "RDFR2A",
  tickets,
  totalPrice: {
    value: 123.45,
    currency: "EUR",
  },
};

export const bookingMocks = {
  booking,
  tickets,
};
