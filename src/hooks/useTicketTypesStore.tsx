import { create } from "zustand";
import { TransportableResponse, TransportablesRequest } from "src/types/models/transportables";

interface BookingState {
  ticketTypes: TransportableResponse[];
  originCode?: TransportablesRequest["originCode"];
  destinationCode?: TransportablesRequest["destinationCode"];
  isLoaded: (originCode: string, destinationCode: string) => boolean;
  setTicketTypes: (
    ticketTypes: TransportableResponse[],
    originCode: TransportablesRequest["originCode"],
    destinationCode: TransportablesRequest["destinationCode"],
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
