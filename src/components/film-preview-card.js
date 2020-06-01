import {convertMinutesToHours} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";
import moment from "moment";

const createFilmPreviewCardTemplate = (film) => {
  const MAX_DESCRIPTIONSIZE = 140;
  const filmGenre = film.genres[0];
  const filmDescription = film.description.length > MAX_DESCRIPTIONSIZE ? `${film.description.substr(0, MAX_DESCRIPTIONSIZE - 1)}...` : film.description;
  const filmRuntime = convertMinutesToHours(film.runtime);
  const releaseDate = moment(film.release.date).format(`YYYY`);
  return (
    `<article class="film-card">
        <h3 class="film-card__title">${film.title}</h3>
        <p class="film-card__rating">${film.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate}</span>
          <span class="film-card__duration">${filmRuntime}</span>
          <span class="film-card__genre">${filmGenre}</span>
        </p>
        <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${filmDescription}</p>
        <a class="film-card__comments">${film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.userDetails.isInWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${film.userDetails.isAlreadyWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${film.userDetails.isFavorite ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
        </form>
      </article>`
  );
};

export default class FilmPreviewCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmPreviewCardTemplate(this._film);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, handler);
  }

  setAlreadyWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, handler);
  }

  setAddToFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
