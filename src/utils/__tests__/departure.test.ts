import { describe, expect, it } from "@jest/globals";
import { departureMocks } from "@mocks/departure";
import { departureUtils } from "../departure";

const [firstDeparture, secondDeparture] = departureMocks.departures;

describe("/utils/departure", () => {
  describe("formatDateAndTime", () => {
    it("should format date and time correctly", () => {
      const formattedDateTime = departureUtils.formatDateAndTime(firstDeparture.departureTime);
      expect(formattedDateTime).toEqual("2021-09-01 10:00");
    });

    it("should return an empty string if departureTime is not provided", () => {
      const formattedDateTime = departureUtils.formatDateAndTime();
      expect(formattedDateTime).toEqual("");
    });
  });

  describe("formatDate", () => {
    it("should format date correctly", () => {
      const formattedDate = departureUtils.formatDate(secondDeparture.departureTime);
      expect(formattedDate).toEqual("2021-09-01");
    });

    it("should return an empty string if departureTime is not provided", () => {
      const formattedDate = departureUtils.formatDate();
      expect(formattedDate).toEqual("");
    });
  });

  describe("formatTime", () => {
    it("should format time correctly", () => {
      const formattedTime = departureUtils.formatTime(firstDeparture.departureTime);
      expect(formattedTime).toEqual("10:00");
    });

    it("should return an empty string if departureTime is not provided", () => {
      const formattedTime = departureUtils.formatTime();
      expect(formattedTime).toEqual("");
    });
  });
});
