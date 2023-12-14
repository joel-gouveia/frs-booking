export const removeUndefinedKeys = <T>(obj: Record<string, T>) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, val]) => val !== undefined));
};
