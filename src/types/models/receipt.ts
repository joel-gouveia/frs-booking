import { Booking } from "./booking";

export interface Receipt {
  bookingNumber?: Booking["number"];
  number: number;
  company: Company;
  routeName: string;
  sale: Sale;
  username: string;
  tse: TSE;
}

interface Company {
  name: string;
  website: string;
}

interface Sale {
  date: string;
  tickets: Ticket[];
  price: Price;
}

interface Ticket {
  name: string;
  quantity: number;
  price: Price;
}

interface Price {
  amount: number;
  currency: string;
  breakdown: Breakdown;
}

interface Breakdown {
  netAmount: number;
  vat: Vat;
}

interface Vat {
  amount: number;
  percentage: number;
}

interface TSE {
  number: string;
  deviceNumber: string;
  signature: string;
  transaction: number;
  startDateTime: string;
  endDateTime: string;
  counterSignature: string;
  algorithmSignature: string;
  timeFormat: string;
}
