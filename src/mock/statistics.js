// const getStatisticsFilter = () => {
//   return [
//     {
//       name: `all time`,
//       watchedFilmsCount: 22,
//       totalWatchedDuration: 130,
//       topGenre: `Sci-Fi`,
//     },
//     {
//       name: `today`,
//       watchedFilmsCount: 23,
//       totalWatchedDuration: 130,
//       topGenre: `Sci-Fi`,
//     },
//     {
//       name: `week`,
//       watchedFilmsCount: 24,
//       totalWatchedDuration: 130,
//       topGenre: `Sci-Fi`,
//     },
//     {
//       name: `month`,
//       watchedFilmsCount: 25,
//       totalWatchedDuration: 130,
//       topGenre: `Sci-Fi`,
//     },
//     {
//       name: `year`,
//       watchedFilmsCount: 26,
//       totalWatchedDuration: 130,
//       topGenre: `Sci-Fi`,
//     },
//   ];
// };

const filterNames = [`all time`, `today`, `week`, `month`, `year`];
const genres = [`Comedy`, `Sci-Fi`];

const getStatisticsFilter = () => {
  return filterNames.map((element) => {
    return {
      name: element,
      watchedFilmsCount: Math.floor(Math.random() * 100),
      totalWatchedDuration: Math.floor(Math.random() * 100),
      topGenre: genres[Math.floor(Math.random() * genres.length)]
    };
  });
};

export {getStatisticsFilter};
