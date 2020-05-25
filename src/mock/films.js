import {getRandomDate, getRandomIntegerNumber} from "../mock/utils.js";

const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Sci-Fi`,
  `History`
];

const titles = [
  `The Shawshank Redemption`,
  `The Godfather`,
  `The Dark Knight`,
  `The Godfather: Part II`,
  `The Lord of the Rings: The Return of the King`,
  `Pulp Fiction`,
  `Schindler's List`,
  `12 Angry Men`,
  `Inception`,
  `Fight Club`,
  `Forrest Gump`,
  `The Matrix`,
  `Goodfellas`,
  `Anand`
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const ageRatings = [`0+`, `3+`, `12+`, `18+`];

const writers = [
  `Thomas Keneally`,
  `Steven Zaillian`,
  `Christopher Nolan`,
  `Leonardo DiCaprio`,
  `Joseph Gordon-Levitt`,
  `Ellen Page`
];

const directors = [
  `Francis Ford Coppola`,
  `Christopher Nolan`,
  `Peter Jackson`,
  `Quentin Tarantino`,
  `Steven Spielberg`,
  `Sidney Lumet `
];

const actors = [
  `Tim Robbins`,
  `Morgan Freeman`,
  `Bob Gunton`,
  `William Sadler`,
  `Marlon Brando`,
  `Al Pacino`,
  `James Caan`,
  `Diane Keaton`
];

const countries = [
  `USA`,
  `Korea`,
  `Canada`,
  `Russia`,
  `France`
];

const descriptions = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra.
Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
In rutrum ac purus sit amet tempus.`.split(`.`);

const sliceRandomElements = (arr) => {
  return arr.slice(Math.floor(Math.random() * (arr.length - 1)), Math.floor(Math.random() * arr.length));
};

const getRandomBoolValue = () => {
  return Boolean(Math.round(Math.random()));
};

const films = titles.map((element, index) => {
  return {
    id: index + 1,
    title: element,
    alternativeTitle: `Alternative Title #${index + 1}`,
    totalRating: Math.round(Math.random() * (10 - 1) + 1 * 10) / 10,
    poster: posters[Math.floor(Math.random() * posters.length)],
    ageRating: ageRatings[Math.floor(Math.random() * ageRatings.length)],
    director: directors[Math.floor(Math.random() * directors.length)],
    writers: sliceRandomElements(writers).join(`, `),
    actors: sliceRandomElements(actors).join(`, `),
    release: {
      date: getRandomDate(),
      country: countries[Math.floor(Math.random() * countries.length)]
    },
    runtime: getRandomIntegerNumber(70, 180),
    genres: sliceRandomElements(genres),
    description: sliceRandomElements(descriptions).join(``),
    userDetails: {
      isInWatchlist: getRandomBoolValue(),
      isAlreadyWatched: getRandomBoolValue(),
      watchingDate: getRandomDate(),
      isFavorite: getRandomBoolValue()
    },
    comments: [
      1, 2, 3
    ]
  };
});

const getFilms = (currentPage, pageSize) => {
  const totalItems = films.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (currentPage === undefined || currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    totalItemsCount: films.length,
    items: Array.from(films).slice(startIndex, endIndex)
  };
};

const getFilm = (id) => {
  return films.find((element)=>element.id === id);
};

export {getFilm, getFilms};
