import { Receipt } from "src/types/interfaces/receipt";

const receipt: Receipt = {
  bookingNumber: "RDFR2A",
  number: 99,
  company: {
    name: "Weiße Flotte",
    website: "www.weisse-flotte.de",
  },
  routeName: "Warnow Ferry (Fähre)",
  sale: {
    date: "11-11-2023",
    tickets: [
      {
        name: "Adult - Standard",
        quantity: 1,
        price: {
          amount: 1.9,
          currency: "EUR",
          breakdown: {
            netAmount: 1.78,
            vat: {
              amount: 0.12,
              percentage: 7,
            },
          },
        },
      },
    ],
    price: {
      amount: 1.9,
      currency: "EUR",
      breakdown: {
        netAmount: 1.78,
        vat: {
          amount: 0.12,
          percentage: 7,
        },
      },
    },
  },
  username: "Wellmann Christian",
  tse: {
    number: "73D8",
    deviceNumber: "NC1A",
    signature: "/L8WH6",
    transaction: 712196,
    startDateTime: "11-11-2023T17:14:45",
    endDateTime: "11-11-2023T17:14:47",
    counterSignature: "1448493",
    algorithmSignature: "ecdsa-plain-SHA256",
    timeFormat: "unixTime",
  },
};

export const receiptMocks = {
  receipt,
};
