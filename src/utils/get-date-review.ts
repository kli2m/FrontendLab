import { Months } from '../constants/months';

export const getDateReview = (date: Date): string => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  return `${day} ${Months[month]} ${year}`;
};
