import { Ticket } from "./ticket";

export interface PriceRequest {
  uuid: string;
  tickets: Ticket[];
}
export interface Price {
  value: number;
  currency: string;
}
