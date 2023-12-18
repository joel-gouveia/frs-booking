import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { NavigationScreens } from "src/types/navigation";
import { PasswordResetScreen } from "@screens/PasswordReset";

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe("Main Menu Screen", () => {
  it("renders send email button, and username and email fields", async () => {
    const { getByTestId } = render(<PasswordResetScreen />);

    await waitFor(() => {
      expect(getByTestId("username-input")).toBeTruthy();
      expect(getByTestId("email-input")).toBeTruthy();
      expect(getByTestId("send-email-btn")).toBeTruthy();
    });
  });

  it("navigates to login screen, when pressing send email button", async () => {
    const { getByTestId } = render(<PasswordResetScreen />);
    fireEvent.press(getByTestId("send-email-btn"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.LOGIN);
    });
  });
});
