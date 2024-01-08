import { DepartureResponse } from "src/types/models/departure";
import { extractDateFromDateTime, extractTimeFromDateTime } from "./date";

/**
 * Format departure date and time
 * @param departureTime Departure time
 * @returns Formatted date and time
 * @example
 * formatDateAndTime("2021-05-05T12:00:00+02:00")
 * // => "05.05.2021 12:00"
 */
const formatDateAndTime = (departureTime?: DepartureResponse["departureTime"]) => {
  if (!departureTime) return "";
  return `${formatDate(departureTime)} ${formatTime(departureTime)}`;
};

/**
 * Format departure date
 * @param departureTime Departure time
 * @returns Formatted date
 * @example
 * formatDate("2021-05-05T12:00:00+02:00")
 * // => "05.05.2021"
 */
const formatDate = (departureTime?: DepartureResponse["departureTime"]) => {
  if (!departureTime) return "";
  return extractDateFromDateTime(departureTime);
};

/**
 * Format departure time
 * @param departureTime Departure time
 * @returns Formatted time
 * @example
 * formatTime("2021-05-05T12:00:00+02:00")
 * // => "12:00"
 */
const formatTime = (departureTime?: DepartureResponse["departureTime"]) => {
  if (!departureTime) return "";
  return extractTimeFromDateTime(departureTime);
};

export const departureUtils = {
  formatDateAndTime,
  formatDate,
  formatTime,
};
