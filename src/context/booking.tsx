import React, { createContext, useState, ReactNode } from "react";

interface BookingContextProps {
  originCode: string;
  destinationCode: string;
  departureTime: string;
  setDepartureTime: React.Dispatch<React.SetStateAction<string>>;
  setRoute: (originCode: string, destinationCode: string) => void;
  departureDate: string;
  setDepartureDate: React.Dispatch<React.SetStateAction<string>>;
  itemCounters: Record<string, number>;
  setItemCounters: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export const BookingContext = createContext({} as BookingContextProps);

export function BookingContextProvider({ children }: { children: ReactNode }) {
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [itemCounters, setItemCounters] = useState<Record<string, number>>({});

  const setRoute = (originCodeVal: string, destinationCodeVal: string) => {
    setOriginCode(originCodeVal);
    setDestinationCode(destinationCodeVal);
  };

  const value = {
    originCode,
    destinationCode,
    setRoute,
    departureDate,
    setDepartureDate,
    departureTime,
    setDepartureTime,
    itemCounters,
    setItemCounters,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
