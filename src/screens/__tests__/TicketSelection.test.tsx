import React from "react";
import { render, waitFor, within } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { TicketSelectionScreen } from "@screens/TicketSelection/TicketSelection";
import { NavigationScreens } from "src/types/navigation";

const TICKET_TYPE = "ticketType 1";
const ORIGIN_CODE = "origin";
const DESTINATION_CODE = "destiny";
const DEPARTURE_DATE = "2020-01-02";
const DEPARTURE_TIME = "10:00";

const mockUseBooking = jest.fn().mockReturnValue({
  originCode: ORIGIN_CODE,
  destinationCode: DESTINATION_CODE,
  departureDate: DEPARTURE_DATE,
  departureTime: DEPARTURE_TIME,
  itemCounters: {},
});
jest.mock("@hooks/useBookingStore", () => {
  return {
    useBookingStore: () => mockUseBooking(),
  };
});

const mockUseTicketTypesStore = jest.fn().mockReturnValue([]);
jest.mock("@hooks/useTicketTypesStore", () => {
  return {
    useTicketTypesStore: () => mockUseTicketTypesStore(),
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

describe("Ticket Selection Screen", () => {
  it("renders title and subtitle according to the ticket type and selected route", async () => {
    const { getByText } = render(
      <TicketSelectionScreen
        route={{
          key: "",
          name: NavigationScreens.TICKET_SELECTION,
          params: { ticketType: TICKET_TYPE },
        }}
      />,
    );

    await waitFor(() => {
      // Title
      expect(getByText(TICKET_TYPE)).toBeTruthy();

      // Sub title
      expect(getByText(new RegExp(ORIGIN_CODE))).toBeTruthy();
      expect(getByText(new RegExp(DESTINATION_CODE))).toBeTruthy();
      expect(getByText(new RegExp(DEPARTURE_DATE))).toBeTruthy();
      expect(getByText(new RegExp(DEPARTURE_TIME))).toBeTruthy();
    });
  });

  it("renders ticket items acconding to the transportables", async () => {
    mockUseTicketTypesStore.mockReturnValue([
      {
        key: 1,
        name: TICKET_TYPE,
        transportables: [
          {
            name: "Car",
            key: 111,
          },
          {
            name: "Person",
            key: 222,
          },
          {
            name: "Baby",
            key: 333,
          },
        ],
      },
    ]);

    const { getAllByTestId } = render(
      <TicketSelectionScreen
        route={{
          key: "",
          name: NavigationScreens.TICKET_SELECTION,
          params: { ticketType: TICKET_TYPE },
        }}
      />,
    );

    await waitFor(() => {
      const ticketTypes = getAllByTestId("item");
      expect(ticketTypes).toHaveLength(3);
      expect(
        ticketTypes.find(el => within(el).queryByText("111") && within(el).queryByText("Car")),
      ).toBeTruthy();
      expect(
        ticketTypes.find(el => within(el).queryByText("222") && within(el).queryByText("Person")),
      ).toBeTruthy();
      expect(
        ticketTypes.find(el => within(el).queryByText("333") && within(el).queryByText("Baby")),
      ).toBeTruthy();
    });
  });
});
