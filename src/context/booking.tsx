import React, { createContext, useState, ReactNode } from "react";

interface BookingContextProps {
  originCode: string;
  destinationCode: string;
  setRoute: (originCode: string, destinationCode: string) => void;
}

export const BookingContext = createContext({} as BookingContextProps);

export function BookingContextProvider({ children }: { children: ReactNode }) {
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");

  const setRoute = (originCodeVal: string, destinationCodeVal: string) => {
    setOriginCode(originCodeVal);
    setDestinationCode(destinationCodeVal);
  };

  const value = { originCode, destinationCode, setRoute };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
