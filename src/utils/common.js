export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomDate = () => {
  const randomDay = getRandomIntegerNumber(1, 30);
  const randomMonth = getRandomIntegerNumber(1, 12);
  const randomYear = getRandomIntegerNumber(1950, 2019);
  return new Date(randomYear, randomMonth, randomDay);
};

export const convertMinutesToHours = (minutes) => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

export const capitalizeFirstLetter = (str) =>{
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

