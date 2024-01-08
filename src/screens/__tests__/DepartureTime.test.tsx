import React from "react";
import i18n from "src/config/i18n/i18n";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { getDepartures } from "@api/departure.service";
import { DepartureTimeScreen } from "@screens/DepartureTime";
import { NavigationScreens } from "src/types/navigation";

import { extractTimeFromDateTime } from "@utils/date";
import { departureMocks, routeMocks } from "@mocks/index";

const DEPARTURE_MOCK = departureMocks.departures[0];
const ROUTE_MOCK = routeMocks.routes[0];
const mockSetDeparture = jest.fn();

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock("src/api/departure.service.ts", () => ({
  getDepartures: jest.fn<typeof getDepartures>().mockResolvedValue([]),
}));

jest.mock("@hooks/useBookingStore", () => {
  return {
    useBookingStore: () => ({
      route: ROUTE_MOCK,
      departure: DEPARTURE_MOCK,
      setDeparture: mockSetDeparture,
    }),
  };
});

describe("Departure Time Screen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the screen with title and main menu footer button", async () => {
    const { getAllByTestId, getByText } = render(<DepartureTimeScreen />);

    await waitFor(() => {
      expect(getByText(i18n.t("departure-times.choose-departure"))).toBeTruthy();
      expect(getByText(i18n.t("footer.main-menu"))).toBeTruthy();
      expect(getAllByTestId("footer-btn")).toHaveLength(1);
    });
  });

  it("makes /depatures API call and displays buttons using the departure times", async () => {
    (getDepartures as jest.Mock<typeof getDepartures>).mockResolvedValue(departureMocks.departures);

    const { getAllByTestId, getByText } = render(<DepartureTimeScreen />);

    await waitFor(() => {
      expect(getDepartures).toHaveBeenCalledWith({
        originCode: ROUTE_MOCK.origin.code,
        destinationCode: ROUTE_MOCK.destination.code,
      });

      const firstDeparture = departureMocks.departures[0];
      const secondDeparture = departureMocks.departures[1];

      expect(getByText(extractTimeFromDateTime(firstDeparture.departureTime))).toBeTruthy();
      expect(getByText(extractTimeFromDateTime(secondDeparture.departureTime))).toBeTruthy();
      expect(getAllByTestId("departure-btn")).toHaveLength(2);
    });
  });

  it("goes to Ticket Types screen and saves it, when pressing button with time", async () => {
    (getDepartures as jest.Mock<typeof getDepartures>).mockResolvedValue(departureMocks.departures);

    const { getByText } = render(<DepartureTimeScreen />);

    await waitFor(() => {
      fireEvent.press(getByText(extractTimeFromDateTime(DEPARTURE_MOCK.departureTime)));
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.TICKET_TYPES);
      expect(mockSetDeparture).toHaveBeenCalledWith(DEPARTURE_MOCK);
    });
  });
});
