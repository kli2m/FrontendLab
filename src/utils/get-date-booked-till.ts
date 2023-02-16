export const getDateBookedTill = (date: Date): string => {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${month > 9 ? month : `0${month}`}.${year}`;
};
