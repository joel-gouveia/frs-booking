export const extractTimeFromDateTime = (dateTimeStr: string) => {
  const regex = /\d{4}-\d{2}-\d{2}T(\d{2}:\d{2})/;
  const matches = dateTimeStr.match(regex);
  return matches ? matches[1] : "";
};
