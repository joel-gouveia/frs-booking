export const getTodayDateString = () => {
  // TODO: Change date format according to language. For German DD.MM.YYYY, for english DD-MM-YYYY or something similar
  return new Date().toISOString().split("T")[0];
};

export const extractDateFromDateTime = (dateTimeStr: string) => {
  const regex = /(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}/;
  const matches = dateTimeStr.match(regex);
  return matches ? matches[1] : "";
};

export const extractTimeFromDateTime = (dateTimeStr: string) => {
  const regex = /\d{4}-\d{2}-\d{2}T(\d{2}:\d{2})/;
  const matches = dateTimeStr.match(regex);
  return matches ? matches[1] : "";
};
