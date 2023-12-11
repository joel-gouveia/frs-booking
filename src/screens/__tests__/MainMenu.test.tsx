import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { NavigationScreens } from "src/types/navigation";
import i18n from "@config/i18n/i18n";
import { MainMenuScreen } from "..";

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const mockLogout = jest.fn();
jest.mock("@hooks/useAuth", () => {
  return {
    useAuth: () => ({
      logout: mockLogout,
    }),
  };
});

describe("Main Menu Screen", () => {
  it("renders main buttons and footer logout button", async () => {
    const { getAllByTestId, getByText } = render(<MainMenuScreen />);

    await waitFor(() => {
      // Main Buttons
      expect(getByText(i18n.t("main-menu.sales"))).toBeTruthy();
      expect(getByText(i18n.t("main-menu.boarding"))).toBeTruthy();
      expect(getByText(i18n.t("main-menu.cancel"))).toBeTruthy();

      expect(getAllByTestId("footer-btn")).toHaveLength(1);
      expect(getByText("Logout")).toBeTruthy();
    });
  });

  it("logs out and navigates to Login screen, when clicking on the logout footer button", async () => {
    const { getByText } = render(<MainMenuScreen />);
    fireEvent.press(getByText("Logout"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.LOGIN);
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it("navigates to departure times screen, when clicking on sales button", async () => {
    const { getByText } = render(<MainMenuScreen />);
    fireEvent.press(getByText(i18n.t("main-menu.sales")));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.DEPARTURE_TIME);
    });
  });
});
