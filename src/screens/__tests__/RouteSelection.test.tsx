import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { RouteSelectionScreen } from "@screens/RouteSelection";
import { getRoutes } from "@api/route.service";
import { NavigationScreens } from "src/types/navigation";

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const mockSetRoute = jest.fn();
jest.mock("@hooks/useBooking", () => {
  return {
    useBooking: () => ({
      setRoute: mockSetRoute,
    }),
  };
});

jest.mock("src/api/route.service.ts", () => ({
  getRoutes: jest.fn<typeof getRoutes>().mockResolvedValue([]),
}));

describe("Route Selection Screen", () => {
  it("renders the screen with title and main button", async () => {
    const { getAllByTestId, getByText, getByTestId } = render(<RouteSelectionScreen />);

    await waitFor(() => {
      expect(getByTestId("title")).toBeTruthy();
      expect(getByText("Main Menu")).toBeTruthy();
      expect(getAllByTestId("footer-btn")).toHaveLength(1);
    });
  });

  it("makes /routes API call and displays buttons using the routes name", async () => {
    (getRoutes as jest.Mock<typeof getRoutes>).mockResolvedValue([
      { name: "route 1", destination: { code: "", name: "" }, origin: { code: "", name: "" } },
      { name: "route 2", destination: { code: "", name: "" }, origin: { code: "", name: "" } },
    ]);

    const { getAllByTestId, getByText } = render(<RouteSelectionScreen />);

    expect(getRoutes).toHaveBeenCalled();

    await waitFor(() => {
      expect(getByText("route 1")).toBeTruthy();
      expect(getByText("route 2")).toBeTruthy();
      expect(getAllByTestId("route-btn")).toHaveLength(2);
    });
  });

  it("goes to Main Menu when clicking a route button, and sets route info", async () => {
    (getRoutes as jest.Mock<typeof getRoutes>).mockResolvedValue([
      {
        name: "route 1",
        destination: { code: "codeDestination", name: "" },
        origin: { code: "codeOrigin", name: "" },
      },
    ]);

    const { getByText } = render(<RouteSelectionScreen />);

    await waitFor(() => {
      fireEvent.press(getByText("route 1"));
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.MAIN_MENU);
      expect(mockSetRoute).toHaveBeenCalledWith("codeOrigin", "codeDestination");
    });
  });
});
