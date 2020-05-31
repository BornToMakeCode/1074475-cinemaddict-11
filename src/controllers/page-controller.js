import Sort from "../components/sort.js";
import ShowMoreButton from "../components/show-more-button.js";
import FilmsContainer from "../components/films-container.js";
import FilmsList from "../components/films-list.js";
import FilmsListContainer from "../components/films-list-container.js";
import FilmsNotFoundMessage from "../components/films-not-found-message.js";
import {ElementPosition, render, remove} from "../utils/render.js";
import {getFilms} from "../mock/films.js";
import {SortType} from "../utils/common.js";
import MovieController from "./movie-controller.js";

const FILMS_COUNT = 5;
let loadedFilmsCount = 0;
let currentPageNumber = 1;
let currentSortBy = SortType.DEFAULT;

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._filmsContainer = new FilmsContainer();
    this._filmsListContainer = new FilmsListContainer();
    this._filmsList = new FilmsList();
    this._showedMovieControllers = [];
    this._films = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _renderFilmsSectionShowMoreButton(container) {
    const showMoreButton = new ShowMoreButton();

    showMoreButton.setClickHandler(() => {
      const newFilms = getFilms(++currentPageNumber, FILMS_COUNT, currentSortBy);
      this._films = newFilms.items;
      const showedFilms = this._renderFilms(container, this._films, this._onDataChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(showedFilms);
      loadedFilmsCount += newFilms.items.length;

      if (loadedFilmsCount >= newFilms.totalItemsCount) {
        remove(showMoreButton);
      }
    });

    render(container, showMoreButton, ElementPosition.BEFORE_END);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((element) => element.setDefaultView());
  }

  _renderFilms(container, films, onDataChange) {
    const filmsListContainerElement = container.querySelector(`.films-list__container`);
    return films.map((currentFilm) => {
      const movieController = new MovieController(filmsListContainerElement, onDataChange, this._onViewChange);

      movieController.render(currentFilm);

      return movieController;
    });
  }

  render(films) {
    this._films = films;
    render(this._container, this._sort, ElementPosition.BEFORE_END);
    render(this._container, this._filmsContainer, ElementPosition.BEFORE_END);
    const filmsElement = this._filmsContainer.getElement();
    render(filmsElement, this._filmsList, ElementPosition.BEFORE_END);
    const filmsListElement = this._filmsList.getElement();

    if (this._films.length > 0) {
      loadedFilmsCount = films.length;
      render(filmsListElement, this._filmsListContainer, ElementPosition.BEFORE_END);
      const showedFilms = this._renderFilms(filmsElement, this._films, this._onDataChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(showedFilms);
      this._renderFilmsSectionShowMoreButton(filmsListElement);

      this._sort.setSortTypeChangeHandler((sortType) => {

        currentSortBy = sortType;
        loadedFilmsCount = 0;
        filmsListElement.innerHTML = ``;
        this._filmsListContainer.getElement().innerHTML = ``;
        render(filmsListElement, this._filmsListContainer, ElementPosition.BEFORE_END);
        currentPageNumber = 1;

        const newFilms = getFilms(currentPageNumber, FILMS_COUNT, sortType);
        this._films = newFilms.items;

        const showedSortedFilms = this._renderFilms(filmsElement, this._films, this._onDataChange);
        this._showedMovieControllers = this._showedMovieControllers.concat(showedSortedFilms);

        this._renderFilmsSectionShowMoreButton(filmsListElement);
      });

    } else {

      const filmsNotFoundMessage = new FilmsNotFoundMessage();
      render(filmsListElement, filmsNotFoundMessage, ElementPosition.BEFORE_END);
    }
  }
}


