import { Price } from "./price";
import { Ticket } from "./ticket";

export interface Booking {
  number: string;
  tickets: Ticket[];
  totalPrice: Price;
}
