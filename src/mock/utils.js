const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomDate = () => {
  const randomDay = getRandomIntegerNumber(1, 30);
  const randomMonth = getRandomIntegerNumber(1, 12);
  const randomYear = getRandomIntegerNumber(1950, 2019);
  return new Date(randomYear, randomMonth, randomDay);
};

const getFormatedDate = (date, locales = `en-GB`, options = {year: `numeric`, month: `long`, day: `numeric`}) => {
  const dateTimeFormat = new Intl.DateTimeFormat(locales, options);
  return dateTimeFormat.format(date);
};

const convertMinutesToHours = (minutes) => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const getUserRankName = (number) => {
  let rankName;

  switch (true) {
    case (number === 0):
      rankName = ``;
      break;
    case number <= 10:
      rankName = `novice`;
      break;
    case number <= 20:
      rankName = `fan`;
      break;
    case (number > 20):
      rankName = `movie buff`;
      break;
  }

  return rankName;
};


export {getRandomIntegerNumber, getRandomDate, getFormatedDate, convertMinutesToHours, getUserRankName};
