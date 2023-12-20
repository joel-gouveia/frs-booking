import { useMemo } from "react";

interface IProps {
  itemCounters: Record<string, number>;
}

const useItemsText = ({ itemCounters }: IProps) => {
  return useMemo(
    () =>
      Object.entries(itemCounters)
        .filter(([_, val]) => val > 0)
        .map(([key, val]) => `(${key}: ${val})`),
    [itemCounters],
  );
};

export default useItemsText;
