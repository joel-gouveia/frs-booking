import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import i18n from "src/config/i18n/i18n";
import { BookingScreen } from "@screens/Booking/Booking";
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
      itemCounters: {},
    }),
  };
});

describe("Booking Screen", () => {
  it("renders the screen with header and footer buttons", async () => {
    const { getByText, getAllByTestId } = render(<BookingScreen />);

    const departureDateTime = `${DATE} ${TIME}`;
    const routeCodes = `${ORIGIN_CODE} - ${DESTINATION_CODE}`;

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
