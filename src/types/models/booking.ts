export interface Booking {
  number: string;
  tickets: [
    {
      code: string;
      quantity: number;
    },
  ];
  totalPrice: {
    value: number;
    currency: string;
  };
}
