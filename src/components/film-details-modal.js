import {convertMinutesToHours} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import moment from "moment";

const createGenres = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  });
};

const createComments = (comments) => {
  return comments.map((comment) => {
    const formatedCreatedDate = moment(comment.createdDate).fromNow();
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${formatedCreatedDate}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  });
};

const createEmoji = (emoji) => {
  return emoji ? `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}"></img>` : ``;
};

const createFilmDetailsModalTemplate = (film, selectedEmoji) => {
  const genresMarkup = createGenres(film.genres).join(`\n`);
  const filmCommentsMarkup = createComments(film.comments).join(`\n`);
  const formatedReleaseDate = moment(film.release.date).format(`D MMMM YYYY`);
  const filmRuntime = convertMinutesToHours(film.runtime);
  return (
    `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${film.poster}" alt="">

                <p class="film-details__age">${film.ageRating}</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${film.title}</h3>
                    <p class="film-details__title-original">Original: ${film.originalTitle}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${film.totalRating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${film.director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${film.writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${film.actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${formatedReleaseDate}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${filmRuntime}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${film.release.country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      ${genresMarkup}
                  </tr>
                </table>

                <p class="film-details__film-description">
                  ${film.description}
                </p>
              </div>
            </div>
            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.userDetails.isInWatchlist ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.userDetails.isAlreadyWatched ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.userDetails.isFavorite ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>

          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

              <ul class="film-details__comments-list">
                ${filmCommentsMarkup}
              </ul>

              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">${createEmoji(selectedEmoji)}</div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>`
  );
};

export default class FilmDetailsModal extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._closeModalButtonClickHandler = null;
    this._addToWatchlistButtonClickHandler = null;
    this._alreadyWatchedButtonClickHandler = null;
    this._addToFavoritesButtonClickHandler = null;
    this._subscribeEmojiClickHandler();
  }

  getTemplate() {
    return createFilmDetailsModalTemplate(this._film, this.emoji);
  }

  recoveryListeners() {
    this.setCloseModalButtonClickHandler(this._closeModalButtonClickHandler);
    this.setAddToWatchlistButtonClickHandler(this._addToWatchlistButtonClickHandler);
    this.setAlreadyWatchedButtonClickHandler(this._alreadyWatchedButtonClickHandler);
    this.setAddToFavoritesButtonClickHandler(this._addToFavoritesButtonClickHandler);
    this._subscribeEmojiClickHandler();
  }

  rerender() {
    super.rerender();
  }

  _subscribeEmojiClickHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`).
      addEventListener(`change`, (event) => {
        if (this.emoji !== event.target.value) {
          this.emoji = event.target.value;
          this.rerender();
        }
      });
  }

  setCloseModalButtonClickHandler(handler) {
    this._closeModalButtonClickHandler = handler;
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this._addToWatchlistButtonClickHandler = handler;
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, handler);
  }

  setAlreadyWatchedButtonClickHandler(handler) {
    this._alreadyWatchedButtonClickHandler = handler;
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, handler);
  }

  setAddToFavoritesButtonClickHandler(handler) {
    this._addToFavoritesButtonClickHandler = handler;
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }
}
