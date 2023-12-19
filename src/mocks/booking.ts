import { Booking } from "src/types/models/booking";
import { Ticket } from "src/types/models/ticket";

const booking: Booking = {
  number: "RDFR2A",
  tickets: [
    {
      code: "AD",
      quantity: 2,
    },
  ],
  totalPrice: {
    value: 123.45,
    currency: "EUR",
  },
};

const tickets: Ticket[] = [
  { code: "AD", quantity: 2 },
  { code: "CH", quantity: 1 },
  { code: "car", quantity: 1 },
];

export const bookingMocks = {
  booking,
  tickets,
};
