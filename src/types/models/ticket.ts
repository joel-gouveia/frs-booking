export interface Ticket {
  code: string;
  quantity: number;
}

export interface TicketTypeGroup {
  key: number;
  name: string;
  transportables: TicketToSell[];
}

export interface TicketToSell {
  code: string;
  name: string;
  key: number;
}
