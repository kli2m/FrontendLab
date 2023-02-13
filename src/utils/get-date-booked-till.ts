export const getDateBookedTill = (str: string): string => {
  const newDate = new Date(Date.parse(str));
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${month > 9 ? month : `0${month}`}.${year}`;
};
