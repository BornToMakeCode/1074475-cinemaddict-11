import {createMainMenuTemplate} from "./components/main-menu.js";
import {createUserRankTemplate} from "./components/user-rank.js";
import {createStatisticsTemplate} from "./components/statistics.js";
import {createFilmPreviewCardTemplate} from "./components/film-preview-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmDetailsModalTemplate} from "./components/film-details-modal.js";
import {createFilmsContainerTemplate} from "./components/films-container.js";
import {createFilmsListContainerTemplate} from "./components/films-list-container.js";
import {createFilmsListExtraContainerTemplate} from "./components/films-list-extra-container.js";
import {createFooterStatisticsTemplate} from "./components/footer-statistics.js";

import {getRandomIntegerNumber} from "./mock/utils.js";
import {getMenu} from "./mock/main-menu.js";
import {getStatisticsFilter} from "./mock/statistics.js";
import {getFilm, getFilms} from "./mock/films.js";
import {getComments} from "./mock/comments.js";


const FILMS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;
const ElementPosition = {
  BEFORE_BEGIN: `beforebegin`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`,
};
const allFilmsCount = 130291;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilmsSection = (films) => {
  const filmsListContainerElement = document.querySelector(`.films-list__container`);
  for (const film of films) {
    render(filmsListContainerElement, createFilmPreviewCardTemplate(film), ElementPosition.BEFORE_END);
  }
};

// const renderExtraFilmsSection = (conainer, title, filmsCount) => {
//   render(conainer, createFilmsListExtraContainerTemplate(title), ElementPosition.BEFORE_END);
//   const extraFilmsListElement = conainer.querySelector(`.films-list--extra:last-child .films-list__container`);
//   for (let i = 0; i < filmsCount; i++) {
//     render(extraFilmsListElement, createFilmPreviewCardTemplate(), ElementPosition.BEFORE_END);
//   }
// };
let currentPageNumber = 1;
let loadedFilmsCount = FILMS_COUNT;
const userRank = getRandomIntegerNumber(0, 50);
const menuItems = getMenu();
const statisticsFilter = getStatisticsFilter();
const film = getFilm(1);
const comments = getComments(film.comments);

const bodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainMenuTemplate(menuItems), ElementPosition.BEFORE_END);
render(siteMainElement, createStatisticsTemplate(statisticsFilter), ElementPosition.BEFORE_END);
const statisticElement = siteMainElement.querySelector(`.statistic`);
render(statisticElement, createUserRankTemplate(userRank), ElementPosition.AFTER_BEGIN);
render(siteMainElement, createFilmsContainerTemplate(), ElementPosition.BEFORE_END);
const filmsElement = siteMainElement.querySelector(`.films`);
render(filmsElement, createFilmsListContainerTemplate(), ElementPosition.BEFORE_END);
const filmsListElement = filmsElement.querySelector(`.films-list`);
render(filmsListElement, createShowMoreButtonTemplate(), ElementPosition.BEFORE_END);
const filmCollection = getFilms(currentPageNumber, FILMS_COUNT);
renderFilmsSection(filmCollection.items);
// renderExtraFilmsSection(filmsElement, `Top rated`, TOP_RATED_FILMS_COUNT);
// renderExtraFilmsSection(filmsElement, `Most commented`, MOST_COMMENTED_FILMS_COUNT);
render(bodyElement, createFilmDetailsModalTemplate(film, comments), ElementPosition.BEFORE_END);
const footer = bodyElement.querySelector(`.footer`);
render(footer, createFooterStatisticsTemplate(allFilmsCount), ElementPosition.BEFORE_END);


const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const newFilms = getFilms(++currentPageNumber, FILMS_COUNT);
  renderFilmsSection(newFilms.items);
  loadedFilmsCount += newFilms.items.length;
  if (loadedFilmsCount >= newFilms.totalItemsCount) {
    showMoreButton.remove();
  }
});

const filmDetailsModal = document.querySelector(`.film-details`);
const closeModalButton = filmDetailsModal.querySelector(`.film-details__close-btn`);
closeModalButton.addEventListener(`click`, () => {
  filmDetailsModal.remove();
});

