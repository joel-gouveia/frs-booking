import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import i18n from "src/config/i18n/i18n";
import { BookingSummaryScreen } from "@screens/BookingSummary";
import { NavigationScreens } from "src/types/navigation";

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const ORIGIN_CODE = "A";
const DESTINATION_CODE = "B";
const TIME = "10:00";
const DATE = "2020-01-01";

jest.mock("@hooks/useBookingStore", () => {
  return {
    useBookingStore: () => ({
      originCode: ORIGIN_CODE,
      destinationCode: DESTINATION_CODE,
      departureDate: DATE,
      departureTime: TIME,
      itemCounters: { adult: 2, child: 1, baby: 0 },
    }),
  };
});

describe("Booking Summary Screen", () => {
  it("renders the screen with header and back buttons", async () => {
    const { getByText } = render(<BookingSummaryScreen />);

    await waitFor(() => {
      expect(
        getByText(RegExp(`${DATE} ${TIME} ${ORIGIN_CODE} - ${DESTINATION_CODE}`)),
      ).toBeTruthy();
      expect(getByText(i18n.t("common.back"))).toBeTruthy();
    });
  });

  it("Displays the items counter, but does not show when it is zero", async () => {
    const { getByText } = render(<BookingSummaryScreen />);

    await waitFor(() => {
      expect(getByText(/adult: 2/)).toBeTruthy();
      expect(getByText(/child: 1/)).toBeTruthy();
      expect(() => getByText(/bike/)).toThrow();
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
