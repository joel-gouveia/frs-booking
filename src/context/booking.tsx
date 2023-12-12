import React, { createContext, useState, ReactNode } from "react";

interface BookingContextProps {
  originCode: string;
  destinationCode: string;
  setRoute: (originCode: string, destinationCode: string) => void;
  setPassengers: (adults: number, kids: number, bikes: number, cars: number) => void;
  numAdults: number;
  numKids: number;
  numBikes: number;
  numCars: number;
}

export const BookingContext = createContext({} as BookingContextProps);

export function BookingContextProvider({ children }: { children: ReactNode }) {
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [numAdults, setNumAdults] = useState(0);
  const [numKids, setNumKids] = useState(0);
  const [numBikes, setNumBikes] = useState(0);
  const [numCars, setNumCars] = useState(0);

  const setRoute = (originCodeVal: string, destinationCodeVal: string) => {
    setOriginCode(originCodeVal);
    setDestinationCode(destinationCodeVal);
  };

  const setPassengers = (adults: number, kids: number, bikes: number, cars: number) => {
    setNumAdults(adults);
    setNumKids(kids);
    setNumBikes(bikes);
    setNumCars(cars);
  };

  const value = {
    originCode,
    destinationCode,
    setRoute,
    setPassengers,
    numAdults,
    numKids,
    numBikes,
    numCars,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
