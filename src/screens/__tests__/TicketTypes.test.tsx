import React from "react";
import { render, waitFor, within } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import i18n from "src/config/i18n/i18n";
import { TicketTypesScreen } from "@screens/TicketTypes";
import { getTransportables } from "@api/transportables.service";

const ORIGIN_CODE = "A";
const DESTINATION_CODE = "B";

const mockUseBooking = jest.fn().mockReturnValue({
  originCode: ORIGIN_CODE,
  destinationCode: DESTINATION_CODE,
});
jest.mock("@hooks/useBookingStore", () => {
  return {
    useBookingStore: () => mockUseBooking(),
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
    (getTransportables as jest.Mock<typeof getTransportables>).mockResolvedValue([
      { key: 111, name: "ticket type 1", transportables: [] },
      { key: 222, name: "ticket type 2", transportables: [] },
    ]);

    const { getAllByTestId } = render(<TicketTypesScreen />);

    await waitFor(() => {
      const ticketTypes = getAllByTestId("ticket-type-btn");
      expect(ticketTypes).toHaveLength(2);
      expect(
        ticketTypes.find(
          el => within(el).queryByText("111") && within(el).queryByText("ticket type 1"),
        ),
      ).toBeTruthy();
      expect(
        ticketTypes.find(
          el => within(el).queryByText("222") && within(el).queryByText("ticket type 2"),
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
