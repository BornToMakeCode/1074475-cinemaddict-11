import {getRandomIntegerNumber} from "../mock/utils.js";

const filterNames = [`all time`, `today`, `week`, `month`, `year`];
const genres = [`Comedy`, `Sci-Fi`];

const getStatisticsFilter = () => {
  return filterNames.map((element) => {
    return {
      name: element,
      watchedFilmsCount: getRandomIntegerNumber(1, 100),
      totalWatchedDuration: getRandomIntegerNumber(1, 100),
      topGenre: genres[getRandomIntegerNumber(0, genres.length)]
    };
  });
};

export {getStatisticsFilter};
