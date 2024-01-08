import React from "react";
import i18n from "src/config/i18n/i18n";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { BookingScreen } from "@screens/Booking/Booking";
import { NavigationScreens } from "src/types/navigation";
import { departureMocks, routeMocks, transportablesMock } from "@mocks/index";
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
      itemCounters: {},
    }),
  };
});

jest.mock("@hooks/useTicketTypesStore", () => {
  return {
    useTicketTypesStore: () => ({
      ticketTypes: transportablesMock.ticketTypes,
    }),
  };
});

describe("Booking Screen", () => {
  it("renders the screen with header and footer buttons", async () => {
    const { getByText, getAllByTestId } = render(<BookingScreen />);

    const departureDateTime = departureUtils.formatDateAndTime(DEPARTURE_MOCK.departureTime);
    const routeCodes = `${ROUTE_MOCK.origin.code} - ${ROUTE_MOCK.destination.code}`;

    await waitFor(() => {
      expect(getByText(RegExp(departureDateTime))).toBeTruthy();
      expect(getByText(RegExp(routeCodes))).toBeTruthy();
      expect(getByText(i18n.t("footer.main-menu"))).toBeTruthy();
      expect(getByText(i18n.t("footer.summary"))).toBeTruthy();
      expect(getByText(i18n.t("footer.reset"))).toBeTruthy();
      expect(getAllByTestId("footer-btn")).toHaveLength(3);
    });
  });

  it("navigates to booking summary screen, when pressing the summary button", async () => {
    const { getByText } = render(<BookingScreen />);

    fireEvent.press(getByText(i18n.t("footer.summary")));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.BOOKING_SUMMARY);
    });
  });

  // TODO: Since we will later use an enpoint, it does not make sense to make these tests now
  it.todo("tests related to the items (adult, bycicle, etc.)");
});
