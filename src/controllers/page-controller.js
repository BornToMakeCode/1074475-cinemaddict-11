import Sort from "../components/sort.js";
import FilmPreviewCard from "../components/film-preview-card.js";
import ShowMoreButton from "../components/show-more-button.js";
import FilmDetailsModal from "../components/film-details-modal.js";
import FilmsContainer from "../components/films-container.js";
import FilmsList from "../components/films-list.js";
import FilmsListContainer from "../components/films-list-container.js";
import FilmsNotFoundMessage from "../components/films-not-found-message.js";
import {ElementPosition, render, remove} from "../utils/render.js";
import {getFilms} from "../mock/films.js";
import {SortType} from "../utils/common.js";

const FILMS_COUNT = 5;
let loadedFilmsCount = 0;
let currentPageNumber = 1;
let currentSortBy = SortType.DEFAULT;

const renderFilmsSectionShowMoreButton = (container) => {
  const showMoreButton = new ShowMoreButton();

  showMoreButton.setClickHandler(() => {
    const newFilms = getFilms(++currentPageNumber, FILMS_COUNT, currentSortBy);
    renderFilms(container, newFilms.items);
    loadedFilmsCount += newFilms.items.length;
    if (loadedFilmsCount >= newFilms.totalItemsCount) {

      remove(showMoreButton);
    }
  });

  render(container, showMoreButton, ElementPosition.BEFORE_END);
};

const renderFilms = (container, films) => {
  const filmsListContainerElement = container.querySelector(`.films-list__container`);
  for (const currentFilm of films) {
    renderFilmPreviewCard(filmsListContainerElement, currentFilm);
  }
};

const renderFilmPreviewCard = (filmsListContainerElement, currentFilm) => {

  const filmPreviewCard = new FilmPreviewCard(currentFilm);
  const filmDetailsModal = new FilmDetailsModal(currentFilm);
  const bodyElement = document.querySelector(`body`);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(filmDetailsModal);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onFilmPreviewCardClick = () => {
    render(bodyElement, filmDetailsModal, ElementPosition.BEFORE_END);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmPreviewCard.setPosterClickHandler(onFilmPreviewCardClick);
  filmPreviewCard.setTitleClickHandler(onFilmPreviewCardClick);
  filmPreviewCard.setCommentsClickHandler(onFilmPreviewCardClick);

  filmDetailsModal.setCloseModalButtonClickHandler(() => {
    remove(filmDetailsModal);
  });

  render(filmsListContainerElement, filmPreviewCard, ElementPosition.BEFORE_END);
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._filmsContainer = new FilmsContainer();
    this._filmsListContainer = new FilmsListContainer();
    this._filmsList = new FilmsList();
  }

  render(films) {
    render(this._container, this._sort, ElementPosition.BEFORE_END);
    render(this._container, this._filmsContainer, ElementPosition.BEFORE_END);
    const filmsElement = this._filmsContainer.getElement();
    render(filmsElement, this._filmsList, ElementPosition.BEFORE_END);
    const filmsListElement = this._filmsList.getElement();

    if (films.length > 0) {
      loadedFilmsCount = films.length;
      render(filmsListElement, this._filmsListContainer, ElementPosition.BEFORE_END);
      renderFilms(filmsElement, films);
      renderFilmsSectionShowMoreButton(filmsListElement);

      this._sort.setSortTypeChangeHandler((sortType) => {

        currentSortBy = sortType;
        loadedFilmsCount = 0;
        filmsListElement.innerHTML = ``;
        this._filmsListContainer.getElement().innerHTML = ``;
        render(filmsListElement, this._filmsListContainer, ElementPosition.BEFORE_END);
        currentPageNumber = 1;

        const newFilms = getFilms(currentPageNumber, FILMS_COUNT, sortType);
        renderFilms(filmsElement, newFilms.items);
        renderFilmsSectionShowMoreButton(filmsListElement);
      });

    } else {

      const filmsNotFoundMessage = new FilmsNotFoundMessage();
      render(filmsListElement, filmsNotFoundMessage, ElementPosition.BEFORE_END);
    }
  }
}


