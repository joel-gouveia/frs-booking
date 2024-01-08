import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import i18n from "src/config/i18n/i18n";
import * as BookingAPI from "@api/booking.service";
import { PaymentScreen } from "@screens/Payment/Payment";
import { generatePrintableReceipt, receiptUtils } from "@utils/receipt";
import { Printer } from "@modules/ThermalPrinter/ThermalPrinter";

import { bookingMocks, receiptMocks, routeMocks, departureMocks } from "@mocks/index";

const DEPARTURE_MOCK = departureMocks.departures[0];
const ROUTE_MOCK = routeMocks.routes[0];

const mockUseBooking = jest.fn().mockReturnValue({
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
  getTickets: jest.fn().mockReturnValue(bookingMocks.tickets),
  getGroupTickets: jest.fn().mockReturnValue(bookingMocks.ticketGroups),
});

jest.mock("@hooks/useBookingStore", () => {
  return {
    useBookingStore: () => mockUseBooking(),
  };
});

jest.mock("@api/price.service", () => {
  return {
    getTotalPrice: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ currency: "EUR", value: 125 })),
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

describe("Payment Screen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the screen with header and footer buttons", async () => {
    const { getByText, getAllByTestId } = render(<PaymentScreen />);

    await waitFor(() => {
      expect(getByText(i18n.t("footer.main-menu"))).toBeTruthy();
      expect(getByText(i18n.t("footer.reset"))).toBeTruthy();
      expect(getAllByTestId("footer-btn")).toHaveLength(3);
    });
  });

  it("Should create booking and print receipt when confirm button is pressed", async () => {
    const { booking, tickets } = bookingMocks;
    const { receipt } = receiptMocks;

    const spiedCreateBooking = jest.spyOn(BookingAPI, "createBooking").mockResolvedValue(booking);
    const spiedGetReceipt = jest.spyOn(BookingAPI, "getReceipt").mockResolvedValue(receipt);
    const spiedGeneratePrintableReceipt = jest.spyOn(receiptUtils, "generatePrintableReceipt");
    const spiedPrinter = jest.spyOn(Printer, "printTcp");

    const { getByText } = render(<PaymentScreen />);

    await waitFor(() => {
      fireEvent.press(getByText(i18n.t("payment.confirm-purchase")));
      expect(spiedCreateBooking).toBeCalledWith(DEPARTURE_MOCK.uuid, tickets);
      expect(spiedGetReceipt).toBeCalledWith(booking.number);
      expect(spiedGeneratePrintableReceipt).toBeCalledWith(receipt);
      expect(spiedPrinter).toBeCalledWith({ payload: generatePrintableReceipt(receipt) });
    });
  });
});
