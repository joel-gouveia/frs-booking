import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { BookingSummaryScreen } from "@screens/BookingSummary";

import { departureMocks, routeMocks } from "@mocks/index";
import { departureUtils } from "@utils/departure";

const DEPARTURE_MOCK = departureMocks.departures[0];
const ROUTE_MOCK = routeMocks.routes[0];

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock("@hooks/useBookingStore", () => {
  return {
    useBookingStore: () => ({
      route: ROUTE_MOCK,
      departure: DEPARTURE_MOCK,
      itemCounters: {
        Passengers: {
          AD: {
            name: "Adult",
            quantity: 2,
          },
          CH: {
            name: "Child",
            quantity: 1,
          },
        },
      },
    }),
  };
});

describe("Booking Summary Screen", () => {
  it("renders the screen with header and back buttons", async () => {
    const { getByText } = render(<BookingSummaryScreen />);

    const departureDateTime = departureUtils.formatDateAndTime(DEPARTURE_MOCK.departureTime);
    const routeCodes = `${ROUTE_MOCK.origin.code} - ${ROUTE_MOCK.destination.code}`;

    await waitFor(() => {
      expect(getByText(RegExp(departureDateTime))).toBeTruthy();
      expect(getByText(RegExp(routeCodes))).toBeTruthy();
    });
  });
});
