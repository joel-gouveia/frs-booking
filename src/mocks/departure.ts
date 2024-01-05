import { DepartureResponse } from "src/types/models/departure";

const departures: DepartureResponse[] = [
  {
    originCode: "AB",
    destinationCode: "CD",
    departureTime: "2021-09-01T10:00:00",
    uuid: "123",
  },
  {
    originCode: "AB",
    destinationCode: "CD",
    departureTime: "2021-09-01T11:00:00",
    uuid: "456",
  },
];

export const departureMocks = {
  departures,
};
