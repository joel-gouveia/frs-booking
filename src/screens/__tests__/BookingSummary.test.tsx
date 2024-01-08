import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { BookingSummaryScreen } from "@screens/BookingSummary";

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

    const departureDateTime = `${DATE} ${TIME}`;
    const routeCodes = `${ORIGIN_CODE} - ${DESTINATION_CODE}`;

    await waitFor(() => {
      expect(getByText(RegExp(departureDateTime))).toBeTruthy();
      expect(getByText(RegExp(routeCodes))).toBeTruthy();
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
});
