import { useContext } from "react";
import { BookingContext } from "@context/booking";

export function useBooking() {
  return useContext(BookingContext);
}
