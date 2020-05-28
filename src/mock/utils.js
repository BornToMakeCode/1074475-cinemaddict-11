const ElementPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

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

const capitalizeFirstLetter = (str) =>{
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, template, place) => {
  switch (place) {
    case ElementPosition.AFTER_BEGIN:
      container.prepend(template);
      break;
    case ElementPosition.BEFORE_END:
      container.append(template);
      break;
  }
};

export {ElementPosition, render, getRandomIntegerNumber, getRandomDate, getFormatedDate, convertMinutesToHours, capitalizeFirstLetter, createElement};
