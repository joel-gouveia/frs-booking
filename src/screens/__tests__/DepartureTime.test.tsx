import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { getDepartures } from "@api/departure.service";
import i18n from "src/config/i18n/i18n";
import { DepartureTimeScreen } from "@screens/DepartureTime";
import { NavigationScreens } from "src/types/navigation";

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

const ORIGIN_CODE = "A";
const DESTINATION_CODE = "B";

jest.mock("@hooks/useBooking", () => {
  return {
    useBooking: () => ({
      originCode: ORIGIN_CODE,
      destinationCode: DESTINATION_CODE,
    }),
  };
});

describe("Departure Time Screen", () => {
  it("renders the screen with title and main menu footer button", async () => {
    const { getAllByTestId, getByText } = render(<DepartureTimeScreen />);

    await waitFor(() => {
      expect(getByText(i18n.t("departure-times.choose-departure"))).toBeTruthy();
      expect(getByText(i18n.t("footer.main-menu"))).toBeTruthy();
      expect(getAllByTestId("footer-btn")).toHaveLength(1);
    });
  });

  it("makes /depatures API call and displays buttons using the departure times", async () => {
    (getDepartures as jest.Mock<typeof getDepartures>).mockResolvedValue([
      { uuid: "1", departureTime: "2020-01-01T10:00:00" },
      { uuid: "2", departureTime: "2020-01-01T12:00:00" },
    ]);

    const { getAllByTestId, getByText } = render(<DepartureTimeScreen />);

    await waitFor(() => {
      expect(getDepartures).toHaveBeenCalledWith({
        originCode: ORIGIN_CODE,
        destinationCode: DESTINATION_CODE,
      });

      expect(getByText("10:00")).toBeTruthy();
      expect(getByText("12:00")).toBeTruthy();
      expect(getAllByTestId("departure-btn")).toHaveLength(2);
    });
  });

  it("goes to Main Menu when clicking on the footer button", async () => {
    const { getByText } = render(<DepartureTimeScreen />);
    fireEvent.press(getByText("Main Menu"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.MAIN_MENU);
    });
  });
});
