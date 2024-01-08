import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import i18n from "src/config/i18n/i18n";
import { BookingSummaryScreen } from "@screens/BookingSummary";
import { NavigationScreens } from "src/types/navigation";

import { departureMocks, routeMocks } from "@mocks/index";

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

    await waitFor(() => {
      // TODO: This will work differently when we use a custom component for the Screen header
      // expect(
      //   getByText(RegExp(`${DATE} ${TIME} ${ORIGIN_CODE} - ${DESTINATION_CODE}`)),
      // ).toBeTruthy();
      expect(getByText(i18n.t("common.back"))).toBeTruthy();
    });
  });

  it("navigates to booking screen, when pressing the back button", async () => {
    const { getByText } = render(<BookingSummaryScreen />);
    fireEvent.press(getByText(i18n.t("common.back")));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.BOOKING);
    });
  });
});
