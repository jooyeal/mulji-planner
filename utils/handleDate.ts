export const convertDate = (date: number): string => {
  if (Number(date) < 10) {
    return `0${date}`;
  } else {
    return String(date);
  }
};
