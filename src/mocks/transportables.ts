import { TicketToSell, TicketTypeGroup } from "src/types/models/ticket";

const ADULT_TRANSPORTABLE = {
  name: "Adult - Standard",
  code: "AD",
  key: 1,
} as TicketToSell;

const CHILD_TRANSPORTABLE = {
  name: "Child",
  code: "CH",
  key: 2,
} as TicketToSell;

const INFANT_TRANSPORTABLE = {
  name: "Infant",
  code: "IN",
  key: 3,
} as TicketToSell;

const CAR_TRANSPORTABLE = {
  name: "Car",
  code: "CA",
  key: 1,
} as TicketToSell;

const BUS_TRANSPORTABLE = {
  name: "Bus",
  code: "BU",
  key: 2,
} as TicketToSell;

const PASSENGERS_GROUP = {
  key: 1,
  name: "Passengers",
  transportables: [ADULT_TRANSPORTABLE, CHILD_TRANSPORTABLE, INFANT_TRANSPORTABLE],
} as TicketTypeGroup;

const VEHICLES_GROUP = {
  key: 2,
  name: "Vehicles",
  transportables: [CAR_TRANSPORTABLE, BUS_TRANSPORTABLE],
} as TicketTypeGroup;

export const ticketTypes = [PASSENGERS_GROUP, VEHICLES_GROUP];

export const transportablesMock = {
  ticketTypes,
};
