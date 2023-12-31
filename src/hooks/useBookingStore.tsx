import { create } from "zustand";
import _, { isEmpty } from "underscore";

import { DepartureResponse } from "src/types/models/departure";
import { RouteResponse } from "src/types/models/route";
import { Ticket, TicketToSell, TicketTypeGroup } from "src/types/models/ticket";

export type ItemCounters = {
  [group in TicketTypeGroup["name"]]: {
    [ticketCode in TicketToSell["code"]]: {
      name: TicketToSell["name"];
      quantity: Ticket["quantity"];
    };
  };
};

export interface BookingStore {
  route?: RouteResponse;
  departure?: DepartureResponse;
  setRoute: (route: RouteResponse) => void;
  setDeparture: (departure: DepartureResponse) => void;
  itemCounters: ItemCounters;
  resetCounters: () => void;
  increment: (group: TicketTypeGroup["name"], ticket: TicketToSell) => void;
  decrement: (group: TicketTypeGroup["name"], ticket: TicketToSell) => void;
  getTickets: () => Ticket[];
  getGroupTickets: () => {
    group: TicketTypeGroup["name"];
    tickets: Array<Ticket & { name: TicketToSell["name"] }>;
  }[];
}

export const useBookingStore = create<BookingStore>()((set, get) => ({
  setRoute: (route: RouteResponse) => set(() => ({ route })),
  setDeparture: (departure: DepartureResponse) => set(() => ({ departure })),
  itemCounters: {},
  getGroupTickets: () =>
    Object.keys(get()?.itemCounters ?? {}).map(group => ({
      group,
      tickets: Object.entries(get()?.itemCounters[group] ?? {}).map(
        ([code, { quantity, name }]) => ({
          code,
          name,
          quantity,
        }),
      ),
    })),
  getTickets: () => {
    return get()
      .getGroupTickets()
      .flatMap(({ tickets }) => tickets);
  },
  resetCounters: () => set(() => ({ groupTickets: [], tickets: [], itemCounters: {} })),
  increment: (group: TicketTypeGroup["name"], ticket: TicketToSell) => {
    set(state => {
      const ticketCount = _.get(state.itemCounters, [group, ticket.code, "quantity"], 0);

      return {
        itemCounters: {
          ...state.itemCounters,
          [group]: {
            ...state.itemCounters[group],
            [ticket.code]: {
              name: ticket.name,
              quantity: ticketCount + 1,
            },
          },
        },
      };
    });
  },
  decrement: (group: TicketTypeGroup["name"], ticket: TicketToSell) => {
    set(state => {
      const currentTicket = _.get(state.itemCounters, [group, ticket.code], null);
      if (!currentTicket) return { itemCounters: state.itemCounters };

      const counters = { ...state.itemCounters };

      if (currentTicket.quantity <= 1) {
        delete counters[group][ticket.code];

        if (isEmpty(counters[group])) {
          delete counters[group];
          return { itemCounters: counters };
        }

        return { itemCounters: { ...state.itemCounters, [group]: counters[group] } };
      }

      return {
        itemCounters: {
          ...state.itemCounters,
          [group]: {
            ...state.itemCounters[group],
            [ticket.code]: {
              ...currentTicket,
              quantity: currentTicket.quantity - 1,
            },
          },
        },
      };
    });
  },
}));
