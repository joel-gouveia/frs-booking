import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import i18n from "src/config/i18n/i18n";
import * as BookingAPI from "@api/booking.service";
import { PaymentScreen } from "@screens/Payment";
import { generatePrintableReceipt, receiptUtils } from "@utils/receipt";
import { Printer } from "@modules/ThermalPrinter/ThermalPrinter";

import { bookingMocks, receiptMocks, routeMocks, departureMocks } from "@mocks/index";
import { departureUtils } from "@utils/departure";

const DEPARTURE_MOCK = departureMocks.departures[0];
const ROUTE_MOCK = routeMocks.routes[0];

const mockUseBooking = jest.fn().mockReturnValue({
  route: ROUTE_MOCK,
  departure: DEPARTURE_MOCK,
  itemCounters: {},
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

describe("Payment Screen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the screen with header and footer buttons", async () => {
    const { getByText, getAllByTestId } = render(<PaymentScreen />);

    const departureDateTime = departureUtils.formatDateAndTime(DEPARTURE_MOCK.departureTime);
    const routeCodes = `${ROUTE_MOCK.origin.code} - ${ROUTE_MOCK.destination.code}`;

    await waitFor(() => {
      expect(getByText(RegExp(departureDateTime))).toBeTruthy();
      expect(getByText(RegExp(routeCodes))).toBeTruthy();
      expect(getByText(i18n.t("footer.main-menu"))).toBeTruthy();
      expect(getByText(i18n.t("footer.reset"))).toBeTruthy();
      expect(getAllByTestId("footer-btn")).toHaveLength(2);
    });
  });

  it("Should create booking and print receipt when confirm button is pressed", async () => {
    const { booking, tickets } = bookingMocks;
    const { receipt } = receiptMocks;

    mockUseBooking.mockReturnValue({
      route: ROUTE_MOCK,
      departure: DEPARTURE_MOCK,
      getTickets: () => tickets,
      itemCounters: {
        Passengers: {
          AD: { name: "Adult", quantity: 2 },
          CH: { name: "Child", quantity: 1 },
        },
      },
    });

    const spiedCreateBooking = jest.spyOn(BookingAPI, "createBooking").mockResolvedValue(booking);
    const spiedGetReceipt = jest.spyOn(BookingAPI, "getReceipt").mockResolvedValue(receipt);
    const spiedGeneratePrintableReceipt = jest.spyOn(receiptUtils, "generatePrintableReceipt");
    const spiedPrinter = jest.spyOn(Printer, "printTcp");

    const { getByTestId } = render(<PaymentScreen />);

    await waitFor(() => {
      fireEvent.press(getByTestId("confirm-payment-button"));
      expect(spiedCreateBooking).toBeCalledWith(DEPARTURE_MOCK.uuid, tickets);
      expect(spiedGetReceipt).toBeCalledWith(booking.number);
      expect(spiedGeneratePrintableReceipt).toBeCalledWith(receipt);
      expect(spiedPrinter).toBeCalledWith({ payload: generatePrintableReceipt(receipt) });
    });
  });
});
