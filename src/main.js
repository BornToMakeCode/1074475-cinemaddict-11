import {createMainMenuTemplate} from "./components/main-menu.js";
import {createUserRankTemplate} from "./components/user-rank.js";
import {createStatisticsTemplate} from "./components/statistics.js";
import {createFilmPreviewCardTemplate} from "./components/film-preview-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmDetailsModalTemplate} from "./components/film-details-modal.js";
import {createFilmsContainerTemplate} from "./components/films-container.js";
import {createFilmsListContainerTemplate} from "./components/films-list-container.js";
import {createFilmsListExtraContainerTemplate} from "./components/films-list-extra-container.js";

const FILMS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;
const ElementPosition = {
  BEFORE_BEGIN: `beforebegin`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`,
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilmsSection = (conainer, filmsCount) => {
  const filmsListElement = conainer.querySelector(`.films-list`);
  render(filmsListElement, createShowMoreButtonTemplate(), ElementPosition.BEFORE_END);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
  for (let i = 0; i < filmsCount; i++) {
    render(filmsListContainerElement, createFilmPreviewCardTemplate(), ElementPosition.BEFORE_END);
  }
};

const renderExtraFilmsSection = (conainer, title, filmsCount) => {
  render(conainer, createFilmsListExtraContainerTemplate(title), ElementPosition.BEFORE_END);
  const extraFilmsListElement = conainer.querySelector(`.films-list--extra:last-child .films-list__container`);
  for (let i = 0; i < filmsCount; i++) {
    render(extraFilmsListElement, createFilmPreviewCardTemplate(), ElementPosition.BEFORE_END);
  }
};

const bodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainMenuTemplate(), ElementPosition.BEFORE_END);
render(siteMainElement, createStatisticsTemplate(), ElementPosition.BEFORE_END);
const statisticElement = siteMainElement.querySelector(`.statistic`);
render(statisticElement, createUserRankTemplate(), ElementPosition.AFTER_BEGIN);
render(siteMainElement, createFilmsContainerTemplate(), ElementPosition.BEFORE_END);
const filmsElement = siteMainElement.querySelector(`.films`);
render(filmsElement, createFilmsListContainerTemplate(), ElementPosition.BEFORE_END);
renderFilmsSection(filmsElement, FILMS_COUNT);
renderExtraFilmsSection(filmsElement, `Top rated`, TOP_RATED_FILMS_COUNT);
renderExtraFilmsSection(filmsElement, `Most commented`, MOST_COMMENTED_FILMS_COUNT);
render(bodyElement, createFilmDetailsModalTemplate(), ElementPosition.BEFORE_END);
