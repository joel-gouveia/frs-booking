import { useContext } from "react";
import { BookingContext } from "@context/booking";

export default function useBooking() {
  return useContext(BookingContext);
}
