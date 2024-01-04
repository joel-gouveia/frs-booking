import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import i18n from "src/config/i18n/i18n";
import * as BookingAPI from "@api/booking.service";
import { PaymentScreen } from "@screens/Payment/Payment";
import { bookingMocks, receiptMocks } from "@mocks/index";
import { generatePrintableReceipt, receiptUtils } from "@utils/receipt";
import { Printer } from "@modules/ThermalPrinter/ThermalPrinter";

const ORIGIN_CODE = "A";
const DESTINATION_CODE = "B";
const TIME = "10:00";
const DATE = "2020-01-01";
const UUID = "71295f1e-a874-4048-bafe-f52df4a7e77f";

const mockUseBooking = jest.fn().mockReturnValue({
  originCode: ORIGIN_CODE,
  destinationCode: DESTINATION_CODE,
  departureDate: DATE,
  departureTime: TIME,
  uuid: UUID,
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

    await waitFor(() => {
      expect(
        getByText(RegExp(`${DATE} ${TIME} ${ORIGIN_CODE} - ${DESTINATION_CODE}`)),
      ).toBeTruthy();
      expect(getByText(i18n.t("footer.main-menu"))).toBeTruthy();
      expect(getByText(i18n.t("footer.reset"))).toBeTruthy();
      expect(getAllByTestId("footer-btn")).toHaveLength(2);
    });
  });

  it("Displays the items counter, but does not show when it is zero", async () => {
    mockUseBooking.mockReturnValue({
      itemCounters: { adult: 2, child: 1, car: 1, bike: 0 },
    });

    const { getByText } = render(<PaymentScreen />);

    await waitFor(() => {
      expect(getByText(/adult: 2/)).toBeTruthy();
      expect(getByText(/child: 1/)).toBeTruthy();
      expect(getByText(/car: 1/)).toBeTruthy();
      expect(() => getByText(/bike/)).toThrow();
    });
  });

  it("Should create booking and print receipt when confirm button is pressed", async () => {
    mockUseBooking.mockReturnValue({
      uuid: UUID,
      itemCounters: { adult: 2, child: 1, car: 1, bike: 0 },
    });

    const { booking, tickets } = bookingMocks;
    const { receipt } = receiptMocks;

    const spiedCreateBooking = jest.spyOn(BookingAPI, "createBooking").mockResolvedValue(booking);
    const spiedGetReceipt = jest.spyOn(BookingAPI, "getReceipt").mockResolvedValue(receipt);
    const spiedGeneratePrintableReceipt = jest.spyOn(receiptUtils, "generatePrintableReceipt");
    const spiedPrinter = jest.spyOn(Printer, "printTcp");

    const { getByTestId } = render(<PaymentScreen />);

    await waitFor(() => {
      fireEvent.press(getByTestId("confirm-payment-button"));
      expect(spiedCreateBooking).toBeCalledWith(UUID, tickets);
      expect(spiedGetReceipt).toBeCalledWith(booking.number);
      expect(spiedGeneratePrintableReceipt).toBeCalledWith(receipt);
      expect(spiedPrinter).toBeCalledWith({ payload: generatePrintableReceipt(receipt) });
    });
  });
});
