import React from "react";
import { render, waitFor, within } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import i18n from "src/config/i18n/i18n";
import { TicketTypesScreen } from "@screens/TicketTypes";
import { getTransportables } from "@api/transportables.service";
import { routeMocks, transportablesMock } from "@mocks/index";

const ROUTE_MOCK = routeMocks.routes[0];

jest.mock("@hooks/useBookingStore", () => {
  return {
    useBookingStore: () => ({ route: ROUTE_MOCK }),
  };
});

jest.mock("@hooks/useTicketTypesStore", () => {
  return {
    useTicketTypesStore: () => ({
      isLoaded: jest.fn().mockReturnValue(true),
      ticketTypes: transportablesMock.ticketTypes,
      setTicketTypes: jest.fn(),
    }),
  };
});

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock("src/api/transportables.service.ts", () => ({
  getTransportables: jest.fn<typeof getTransportables>().mockResolvedValue([]),
}));

describe("Ticket Types Screen", () => {
  it("renders ticket buttons and hotkeys according to API response", async () => {
    const { ticketTypes } = transportablesMock;
    (getTransportables as jest.Mock<typeof getTransportables>).mockResolvedValue(ticketTypes);

    const { getAllByTestId } = render(<TicketTypesScreen />);

    await waitFor(() => {
      const ticketButtons = getAllByTestId("ticket-type-btn");
      expect(ticketButtons).toHaveLength(ticketTypes.length);

      expect(
        ticketButtons.find(
          el =>
            within(el).queryByText(ticketTypes[0].key.toString()) &&
            within(el).queryByText(ticketTypes[0].name),
        ),
      ).toBeTruthy();
      expect(
        ticketButtons.find(
          el =>
            within(el).queryByText(ticketTypes[1].key.toString()) &&
            within(el).queryByText(ticketTypes[1].name),
        ),
      ).toBeTruthy();
    });
  });

  it("renders footer buttons: main menu, summary, reset", async () => {
    const { getAllByTestId, getByText } = render(<TicketTypesScreen />);

    await waitFor(() => {
      expect(getAllByTestId("footer-btn")).toHaveLength(3);
      expect(getByText(i18n.t("footer.main-menu"))).toBeTruthy();
      expect(getByText(i18n.t("footer.summary"))).toBeTruthy();
      expect(getByText(i18n.t("footer.reset"))).toBeTruthy();
    });
  });
});
