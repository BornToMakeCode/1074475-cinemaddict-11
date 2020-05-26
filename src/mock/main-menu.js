import {getRandomIntegerNumber, capitalizeFirstLetter} from "../mock/utils.js";

const menuNames = [
  {name: `all movies`, link: `#all`},
  {name: `watchlist`, link: `#watchlist`},
  {name: `history`, link: `#history`},
  {name: `favorites`, link: `#favorites`}
];

const getMenu = () => {
  return menuNames.map((element) => {
    return {
      name: capitalizeFirstLetter(element.name),
      link: element.link,
      count: getRandomIntegerNumber(0, 100)
    };
  });
};

export {getMenu};
