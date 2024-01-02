import { create } from "zustand";
import { TransportableResponse } from "src/types/transportables";

interface BookingState {
  ticketTypes: TransportableResponse[];
  originCode?: string;
  destinationCode?: string;
  isLoaded: (originCode: string, destinationCode: string) => boolean;
  setTicketTypes: (
    ticketTypes: TransportableResponse[],
    originCode: string,
    destinationCode: string,
  ) => void;
}

export const useTicketTypesStore = create<BookingState>()((set, get) => ({
  ticketTypes: [],
  originCode: undefined,
  destinationCode: undefined,
  isLoaded: (originCode: string, destinationCode: string) => {
    const { originCode: savedOriginCode, destinationCode: savedDestinationCode } = get();

    return originCode === savedOriginCode && destinationCode === savedDestinationCode;
  },
  setTicketTypes: (ticketTypes, originCode, destinationCode) =>
    set(state => ({ ...state, ticketTypes, originCode, destinationCode })),
}));
