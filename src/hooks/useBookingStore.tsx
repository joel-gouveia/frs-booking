import { create } from "zustand";

interface BookingState {
  originCode: string;
  destinationCode: string;
  setRoute: (originCode: string, destinationCode: string) => void;
  departureTime: string;
  departureDate: string;
  itemCounters: Record<string, number>;
  setDepartureTime: (time: string) => void;
  setDepartureDate: (date: string) => void;
  setItemCounters: (val: Record<string, number>) => void;
  resetItemCounters: () => void;
  incrementItemCountersKey: (key: string) => void;
  decrementItemCountersKey: (key: string) => void;
}

export const useBookingStore = create<BookingState>()(set => ({
  originCode: "",
  destinationCode: "",
  departureDate: "",
  departureTime: "",
  itemCounters: {},
  setRoute: (originCode: string, destinationCode: string) =>
    set(state => ({ ...state, originCode, destinationCode })),
  setDepartureTime: time => set(state => ({ ...state, departureTime: time })),
  setDepartureDate: date => set(state => ({ ...state, departureDate: date })),
  setItemCounters: val => set(state => ({ ...state, itemCounters: val })),
  resetItemCounters: () =>
    set(state => {
      const resetItemCounter = Object.keys(state.itemCounters).reduce(
        (prev, curr) => ({ ...prev, [curr]: 0 }),
        {} as Record<string, number>,
      );

      return { ...state, itemCounters: resetItemCounter };
    }),
  incrementItemCountersKey: key =>
    set(state => {
      const count = state.itemCounters[key] ?? 0;
      const updatedItemCounters = { ...state.itemCounters, [key]: count + 1 };

      return { ...state, itemCounters: updatedItemCounters };
    }),
  decrementItemCountersKey: key =>
    set(state => {
      const count = state.itemCounters[key] ?? 0;
      const newCount = Math.max(count - 1, 0);
      const updatedItemCounters = { ...state.itemCounters, [key]: newCount };

      return { ...state, itemCounters: updatedItemCounters };
    }),
}));
