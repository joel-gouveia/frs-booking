import React, { createContext, useState, ReactNode } from "react";

interface BookingContextProps {
  originCode: string;
  destinationCode: string;
  departureTime: string;
  setDepartureTime: React.Dispatch<React.SetStateAction<string>>;
  setRoute: (originCode: string, destinationCode: string) => void;
  setPassengers: (adults: number, kids: number, bikes: number, cars: number) => void;
  departureDate: string;
  setDepartureDate: React.Dispatch<React.SetStateAction<string>>;
  numAdults: number;
  numKids: number;
  numBikes: number;
  numCars: number;
}

export const BookingContext = createContext({} as BookingContextProps);

export function BookingContextProvider({ children }: { children: ReactNode }) {
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numAdults, setNumAdults] = useState(0);
  const [numKids, setNumKids] = useState(0);
  const [numBikes, setNumBikes] = useState(0);
  const [numCars, setNumCars] = useState(0);
  const [departureTime, setDepartureTime] = useState("");

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
    departureDate,
    setDepartureDate,
    numAdults,
    numKids,
    numBikes,
    numCars,
    departureTime,
    setDepartureTime,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
