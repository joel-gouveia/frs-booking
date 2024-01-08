import { useBookingStore } from "@hooks/useBookingStore";
import { describe, expect, it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react-hooks";

import { routeMocks, departureMocks, transportablesMock } from "@mocks/index";

const [firstRoute] = routeMocks.routes;
const [firstDeparture] = departureMocks.departures;

const { ticketTypes } = transportablesMock;
const [PASSENGERS_GROUP, VEHICLES_GROUP] = ticketTypes;
const [ADULT_TRANSPORTABLE, CHILD_TRANSPORTABLE, INFANT_TRANSPORTABLE] =
  PASSENGERS_GROUP.transportables;
const [CAR_TRANSPORTABLE, BUS_TRANSPORTABLE] = VEHICLES_GROUP.transportables;

describe("/hooks/useBookingStore", () => {
  it("initial value is undefined for route, departure and empty for itemCounters", () => {
    const { result } = renderHook(() => useBookingStore());
    expect(result.current.route).toBeUndefined();
    expect(result.current.departure).toBeUndefined();
    expect(result.current.itemCounters).toEqual({});
    expect(result.current.getTickets()).toEqual([]);
    expect(result.current.getGroupTickets()).toEqual([]);
  });

  it("setRoute sets the route", () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.setRoute(firstRoute));

    const currentRoute = result.current.route;

    expect(currentRoute).toEqual(firstRoute);
    expect(currentRoute).toHaveProperty("name");
    expect(currentRoute).toHaveProperty("origin");
    expect(currentRoute).toHaveProperty("destination");

    expect(currentRoute?.origin).toHaveProperty("code");
    expect(currentRoute?.origin).toHaveProperty("name");

    expect(currentRoute?.destination).toHaveProperty("code");
    expect(currentRoute?.destination).toHaveProperty("name");
  });

  it("setDeparture sets the departure", () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.setDeparture(firstDeparture));

    const currentDeparture = result.current.departure;

    expect(currentDeparture).toEqual(firstDeparture);
    expect(currentDeparture).toHaveProperty("uuid");
    expect(currentDeparture).toHaveProperty("departureTime");
    expect(currentDeparture).toHaveProperty("originCode");
    expect(currentDeparture).toHaveProperty("destinationCode");
  });

  it("getGroupTickets returns an empty array if there are no tickets", () => {
    const { result } = renderHook(() => useBookingStore());
    expect(result.current.getGroupTickets()).toEqual([]);
  });

  it("getTickets returns an empty array if there are no tickets", () => {
    const { result } = renderHook(() => useBookingStore());
    expect(result.current.getTickets()).toEqual([]);
  });

  it("increment adds a ticket to the itemCounters. getTickets and getGroupTickets should return formatted tickets", () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.increment(PASSENGERS_GROUP.name, ADULT_TRANSPORTABLE));

    expect(result.current.itemCounters).toEqual({
      [PASSENGERS_GROUP.name]: {
        [ADULT_TRANSPORTABLE.code]: {
          name: ADULT_TRANSPORTABLE.name,
          quantity: 1,
        },
      },
    });

    expect(result.current.getTickets()).toEqual([
      {
        code: ADULT_TRANSPORTABLE.code,
        name: ADULT_TRANSPORTABLE.name,
        quantity: 1,
      },
    ]);

    expect(result.current.getGroupTickets()).toEqual([
      {
        group: PASSENGERS_GROUP.name,
        tickets: [
          {
            code: ADULT_TRANSPORTABLE.code,
            name: ADULT_TRANSPORTABLE.name,
            quantity: 1,
          },
        ],
      },
    ]);
  });

  it("decrement removes a ticket from the itemCounters. getTickets and getGroupTickets should return formatted tickets", () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.increment(VEHICLES_GROUP.name, CAR_TRANSPORTABLE));

    expect(result.current.itemCounters).toEqual({
      [VEHICLES_GROUP.name]: {
        [CAR_TRANSPORTABLE.code]: {
          name: CAR_TRANSPORTABLE.name,
          quantity: 1,
        },
      },
    });

    act(() => result.current.decrement(VEHICLES_GROUP.name, CAR_TRANSPORTABLE));

    expect(result.current.getTickets()).toEqual([]);
    expect(result.current.getGroupTickets()).toEqual([]);
  });

  it("resetCounters resets the itemCounters", () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => {
      result.current.increment(VEHICLES_GROUP.name, CAR_TRANSPORTABLE);
      result.current.increment(VEHICLES_GROUP.name, BUS_TRANSPORTABLE);
      result.current.increment(PASSENGERS_GROUP.name, CHILD_TRANSPORTABLE);
      result.current.increment(PASSENGERS_GROUP.name, CHILD_TRANSPORTABLE);
      result.current.increment(PASSENGERS_GROUP.name, INFANT_TRANSPORTABLE);
      result.current.increment(PASSENGERS_GROUP.name, INFANT_TRANSPORTABLE);
    });

    expect(result.current.itemCounters).toEqual({
      [VEHICLES_GROUP.name]: {
        [CAR_TRANSPORTABLE.code]: {
          name: CAR_TRANSPORTABLE.name,
          quantity: 1,
        },
        [BUS_TRANSPORTABLE.code]: {
          name: BUS_TRANSPORTABLE.name,
          quantity: 1,
        },
      },
      [PASSENGERS_GROUP.name]: {
        [CHILD_TRANSPORTABLE.code]: {
          name: CHILD_TRANSPORTABLE.name,
          quantity: 2,
        },
        [INFANT_TRANSPORTABLE.code]: {
          name: INFANT_TRANSPORTABLE.name,
          quantity: 2,
        },
      },
    });

    act(() => result.current.resetCounters());

    expect(result.current.itemCounters).toEqual({});
    expect(result.current.getTickets()).toEqual([]);
    expect(result.current.getGroupTickets()).toEqual([]);
  });

  it("removing all tickets from a group with only one ticket should remove the group", () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.increment(VEHICLES_GROUP.name, CAR_TRANSPORTABLE));
    act(() => result.current.decrement(VEHICLES_GROUP.name, CAR_TRANSPORTABLE));

    expect(result.current.itemCounters).toEqual({});
    expect(result.current.getTickets()).toEqual([]);
    expect(result.current.getGroupTickets()).toEqual([]);
  });

  it("removing all tickets from a group with more than one ticket should remove only that ticket", () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.increment(PASSENGERS_GROUP.name, CHILD_TRANSPORTABLE));
    act(() => result.current.increment(PASSENGERS_GROUP.name, CHILD_TRANSPORTABLE));
    act(() => result.current.increment(PASSENGERS_GROUP.name, INFANT_TRANSPORTABLE));

    expect(result.current.itemCounters).toEqual({
      [PASSENGERS_GROUP.name]: {
        [CHILD_TRANSPORTABLE.code]: {
          name: CHILD_TRANSPORTABLE.name,
          quantity: 2,
        },
        [INFANT_TRANSPORTABLE.code]: {
          name: INFANT_TRANSPORTABLE.name,
          quantity: 1,
        },
      },
    });

    act(() => result.current.decrement(PASSENGERS_GROUP.name, CHILD_TRANSPORTABLE));

    expect(result.current.itemCounters).toEqual({
      [PASSENGERS_GROUP.name]: {
        [CHILD_TRANSPORTABLE.code]: {
          name: CHILD_TRANSPORTABLE.name,
          quantity: 1,
        },
        [INFANT_TRANSPORTABLE.code]: {
          name: INFANT_TRANSPORTABLE.name,
          quantity: 1,
        },
      },
    });

    expect(result.current.getTickets()).toEqual([
      {
        code: CHILD_TRANSPORTABLE.code,
        name: CHILD_TRANSPORTABLE.name,
        quantity: 1,
      },
      {
        code: INFANT_TRANSPORTABLE.code,
        name: INFANT_TRANSPORTABLE.name,
        quantity: 1,
      },
    ]);
    expect(result.current.getGroupTickets()).toEqual([
      {
        group: PASSENGERS_GROUP.name,
        tickets: [
          {
            code: CHILD_TRANSPORTABLE.code,
            name: CHILD_TRANSPORTABLE.name,
            quantity: 1,
          },
          {
            code: INFANT_TRANSPORTABLE.code,
            name: INFANT_TRANSPORTABLE.name,
            quantity: 1,
          },
        ],
      },
    ]);
  });
});
