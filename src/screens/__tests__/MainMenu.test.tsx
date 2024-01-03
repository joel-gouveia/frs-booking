import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { NavigationScreens } from "src/types/navigation";
import i18n from "src/config/i18n/i18n";
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
    const { getByText } = render(<MainMenuScreen />);

    await waitFor(() => {
      expect(getByText(i18n.t("main-menu.booking"))).toBeTruthy();
      expect(getByText(i18n.t("main-menu.boarding"))).toBeTruthy();
      expect(getByText(i18n.t("main-menu.cancel"))).toBeTruthy();
      expect(getByText(i18n.t("main-menu.title"))).toBeTruthy();
    });
  });

  it("navigates to ticket types screen, when clicking on sales button", async () => {
    const { getByText } = render(<MainMenuScreen />);
    fireEvent.press(getByText(i18n.t("main-menu.booking")));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.TICKET_TYPES);
    });
  });
});
