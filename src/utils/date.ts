import { parseISO, format } from "date-fns";

export const getTodayDateString = () => {
  // TODO: Change date format according to language. For German DD.MM.YYYY, for english DD-MM-YYYY or something similar
  const today = new Date();
  return format(today, "yyyy-MM-dd");
};

export const extractTimeFromDateTime = (dateTimeStr: string) => {
  const date = parseISO(dateTimeStr);
  return format(date, "HH:mm");
};
