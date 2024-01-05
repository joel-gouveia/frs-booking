import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { RouteSelectionScreen } from "@screens/RouteSelection";
import { getRoutes } from "@api/route.service";
import { NavigationScreens } from "src/types/navigation";
import { routeMocks } from "@mocks/index";

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const mockSetRoute = jest.fn();
jest.mock("@hooks/useBookingStore", () => {
  return {
    useBookingStore: () => mockSetRoute,
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
    (getRoutes as jest.Mock<typeof getRoutes>).mockResolvedValue(routeMocks.routes);

    const { getAllByTestId, getByText } = render(<RouteSelectionScreen />);

    expect(getRoutes).toHaveBeenCalled();

    await waitFor(() => {
      expect(getByText(routeMocks.routes[0].name)).toBeTruthy();
      expect(getByText(routeMocks.routes[1].name)).toBeTruthy();
      expect(getAllByTestId("route-btn")).toHaveLength(2);
    });
  });

  it("goes to Main Menu when clicking a route button, and sets route info", async () => {
    (getRoutes as jest.Mock<typeof getRoutes>).mockResolvedValue(routeMocks.routes);

    const { getByText } = render(<RouteSelectionScreen />);

    const choosenRoute = routeMocks.routes[0];

    await waitFor(() => {
      fireEvent.press(getByText(choosenRoute.name));
      expect(mockNavigate).toHaveBeenCalledWith(NavigationScreens.DEPARTURE_TIME);
      expect(mockSetRoute).toHaveBeenCalledWith(choosenRoute);
    });
  });
});
