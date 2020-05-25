import {convertMinutesToHours} from "../mock/utils.js";

export const createFilmPreviewCardTemplate = (film) => {
  const maxDescriptionSize = 140;
  const filmGenre = film.genres[0];
  const filmDescription = film.description.length > maxDescriptionSize ? `${film.description.substr(0, maxDescriptionSize - 1)}...` : film.description;
  const filmRuntime = convertMinutesToHours(film.runtime);
  return (
    `
        <article class="film-card">
          <h3 class="film-card__title">${film.title}</h3>
          <p class="film-card__rating">${film.totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${film.release.date.getFullYear()}</span>
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
        </article>
      `
  );
};
