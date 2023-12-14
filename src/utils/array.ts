export const chunkArray = <T>(arr: T[], size: number): T[][] => {
  return arr.reduce((acc, e, i) => {
    if (i % size === 0) acc.push([]);
    acc[Math.floor(i / size)].push(e);
    return acc;
  }, [] as T[][]);
};
