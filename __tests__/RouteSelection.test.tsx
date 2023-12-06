import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { RouteSelectionScreen } from "@screens/RouteSelection";
import { getRoutes } from "@api/route";

jest.mock("src/api/route.ts", () => ({
  getRoutes: jest.fn<typeof getRoutes>().mockResolvedValue([]),
}));

describe("Route Selection Screen", () => {
  it("renders the screen with title and main button", () => {
    const { getAllByTestId, getByText, getByTestId } = render(<RouteSelectionScreen />);

    waitFor(() => {
      expect(getByTestId("title")).toBeTruthy();
      expect(getByText("Main Menu")).toBeTruthy();
      expect(getAllByTestId("footer-btn")).toHaveLength(1);
    });
  });

  it("makes an API call and displays buttons using their name", async () => {
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
});
