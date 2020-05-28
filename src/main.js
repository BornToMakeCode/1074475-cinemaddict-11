import MainMenu from "./components/main-menu.js";
import UserRank from "./components/user-rank.js";
import Statistics from "./components/statistics.js";
import FilmPreviewCard from "./components/film-preview-card.js";
import ShowMoreButton from "./components/show-more-button.js";
import FilmDetailsModal from "./components/film-details-modal.js";
import FilmsContainer from "./components/films-container.js";
import FilmsList from "./components/films-list.js";
import FilmsListContainer from "./components/films-list-container.js";
// import FilmsListExtraContainer from "./components/films-list-extra-container.js";
import FooterStatistics from "./components/footer-statistics.js";
import FilmsNotFoundMessage from "./components/films-not-found-message.js";
import {getRandomIntegerNumber, ElementPosition, render} from "./mock/utils.js";
import {getMenu} from "./mock/main-menu.js";
import {getStatisticsFilter} from "./mock/statistics.js";
import {getFilms} from "./mock/films.js";


const FILMS_COUNT = 5;
// const TOP_RATED_FILMS_COUNT = 2;
// const MOST_COMMENTED_FILMS_COUNT = 2;

const ALL_FILMS_COUNT = 130291;

let currentPageNumber = 1;
let loadedFilmsCount = FILMS_COUNT;
const userRankId = getRandomIntegerNumber(0, 50);
const menuItems = getMenu();
const statisticsFilter = getStatisticsFilter();
const statistics = new Statistics(statisticsFilter);
const mainMenu = new MainMenu(menuItems);
const userRank = new UserRank(userRankId);
const footerStatistics = new FooterStatistics(ALL_FILMS_COUNT);

const renderFilmsSectionShowMoreButton = (container) => {
  const showMoreButton = new ShowMoreButton();

  const showMoreButtonElement = showMoreButton.getElement();

  const onShowMoreButtonClick = () => {
    const newFilms = getFilms(++currentPageNumber, FILMS_COUNT);
    renderFilms(container, newFilms.items);
    loadedFilmsCount += newFilms.items.length;
    if (loadedFilmsCount >= newFilms.totalItemsCount) {
      showMoreButtonElement.remove();
    }
  };

  showMoreButtonElement.addEventListener(`click`, onShowMoreButtonClick);

  render(container, showMoreButton.getElement(), ElementPosition.BEFORE_END);
};

const renderFilmsSection = (container, films) => {
  const filmsContainer = new FilmsContainer();
  const filmsListContainer = new FilmsListContainer();
  const filmsList = new FilmsList();

  render(container, filmsContainer.getElement(), ElementPosition.BEFORE_END);
  const filmsElement = filmsContainer.getElement();
  render(filmsElement, filmsList.getElement(), ElementPosition.BEFORE_END);
  const filmsListElement = filmsList.getElement();

  if (films.length > 0) {
    render(filmsListElement, filmsListContainer.getElement(), ElementPosition.BEFORE_END);
    renderFilms(filmsElement, films);
    renderFilmsSectionShowMoreButton(filmsListElement);
  } else {

    const filmsNotFoundMessage = new FilmsNotFoundMessage();
    render(filmsListElement, filmsNotFoundMessage.getElement(), ElementPosition.BEFORE_END);
  }
};

const renderFilms = (container, films) => {
  const filmsListContainerElement = container.querySelector(`.films-list__container`);
  for (const currentFilm of films) {
    renderFilmPreviewCard(filmsListContainerElement, currentFilm);
  }
};

// const renderExtraFilmsSection = (container, title, filmsCount) => {
//   render(container, createFilmsListExtraContainerTemplate(title), ElementPosition.BEFORE_END);
//   const extraFilmsListElement = container.querySelector(`.films-list--extra:last-child .films-list__container`);
//   for (let i = 0; i < filmsCount; i++) {
//     render(extraFilmsListElement, createFilmPreviewCardTemplate(), ElementPosition.BEFORE_END);
//   }
// };

const renderFilmPreviewCard = (filmsListContainerElement, currentFilm) => {

  const filmPreviewCard = new FilmPreviewCard(currentFilm);
  const filmDetailsModal = new FilmDetailsModal(currentFilm);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmDetailsModal.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onFilmPreviewCardClick = () => {
    render(bodyElement, filmDetailsModal.getElement(), ElementPosition.BEFORE_END);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const cardPoster = filmPreviewCard.getElement().querySelector(`.film-card__poster`);
  const cardTitle = filmPreviewCard.getElement().querySelector(`.film-card__title`);
  const cardComments = filmPreviewCard.getElement().querySelector(`.film-card__comments`);

  cardPoster.addEventListener(`click`, onFilmPreviewCardClick);
  cardTitle.addEventListener(`click`, onFilmPreviewCardClick);
  cardComments.addEventListener(`click`, onFilmPreviewCardClick);

  const closeModalButton = filmDetailsModal.getElement().querySelector(`.film-details__close-btn`);
  closeModalButton.addEventListener(`click`, () => {
    filmDetailsModal.getElement().remove();
  });

  render(filmsListContainerElement, filmPreviewCard.getElement(), ElementPosition.BEFORE_END);
};

const bodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, mainMenu.getElement(), ElementPosition.BEFORE_END);
render(siteMainElement, statistics.getElement(), ElementPosition.BEFORE_END);
const statisticElement = siteMainElement.querySelector(`.statistic`);
render(statisticElement, userRank.getElement(), ElementPosition.AFTER_BEGIN);
const filmCollection = getFilms(currentPageNumber, FILMS_COUNT);
renderFilmsSection(siteMainElement, filmCollection.items);


// renderExtraFilmsSection(filmsElement, `Top rated`, TOP_RATED_FILMS_COUNT);
// renderExtraFilmsSection(filmsElement, `Most commented`, MOST_COMMENTED_FILMS_COUNT);
const footer = bodyElement.querySelector(`.footer`);
render(footer, footerStatistics.getElement(), ElementPosition.BEFORE_END);


