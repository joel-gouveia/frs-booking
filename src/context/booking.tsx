import React, { createContext, useState, ReactNode } from "react";

interface BookingContextProps {
  originCode: string;
  destinationCode: string;
  departureTime: string;
  setDepartureTime: React.Dispatch<React.SetStateAction<string>>;
  setRoute: (originCode: string, destinationCode: string) => void;
}

export const BookingContext = createContext({} as BookingContextProps);

export function BookingContextProvider({ children }: { children: ReactNode }) {
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  const setRoute = (originCodeVal: string, destinationCodeVal: string) => {
    setOriginCode(originCodeVal);
    setDestinationCode(destinationCodeVal);
  };

  const value = { originCode, destinationCode, setRoute, departureTime, setDepartureTime };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
