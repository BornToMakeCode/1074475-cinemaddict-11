import FilmPreviewCard from "../components/film-preview-card.js";
import FilmDetailsModal from "../components/film-details-modal.js";
import {ElementPosition, render, remove, replace} from "../utils/render.js";

const bodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmPreviewCard = null;
  }

  _onEscKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._resetModal();
    }
  }

  _resetModal() {
    remove(this._filmDetailsModal);
    document.removeEventListener(`keydown`, this._onEscKeyDownHandler);
  }

  setDefaultView() {
    this._resetModal();
  }

  render(film) {

    const existingFilmPreviewCard = this._filmPreviewCard;
    this._filmPreviewCard = new FilmPreviewCard(film);
    this._filmDetailsModal = new FilmDetailsModal(film);

    const onFilmPreviewCardClick = () => {
      this._onViewChange();
      render(bodyElement, this._filmDetailsModal, ElementPosition.BEFORE_END);
      document.addEventListener(`keydown`, this._onEscKeyDownHandler.bind(this));
      this._filmDetailsModal.setCloseModalButtonClickHandler(() => {
        remove(this._filmDetailsModal);
      });
    };

    this._filmPreviewCard.setPosterClickHandler(onFilmPreviewCardClick);
    this._filmPreviewCard.setTitleClickHandler(onFilmPreviewCardClick);
    this._filmPreviewCard.setCommentsClickHandler(onFilmPreviewCardClick);

    this._filmPreviewCard.setAddToWatchlistButtonClickHandler(() => {
      const changedFilm = Object.assign({}, film);
      changedFilm.userDetails.isInWatchlist = !changedFilm.userDetails.isInWatchlist;
      this._onDataChange(this, film, changedFilm);
    });

    this._filmPreviewCard.setAlreadyWatchedButtonClickHandler(() => {
      const changedFilm = Object.assign({}, film);
      changedFilm.userDetails.isAlreadyWatched = !changedFilm.userDetails.isAlreadyWatched;
      this._onDataChange(this, film, changedFilm);
    });

    this._filmPreviewCard.setAddToFavoritesButtonClickHandler(() => {
      const changedFilm = Object.assign({}, film);
      changedFilm.userDetails.isFavorite = !changedFilm.userDetails.isFavorite;
      this._onDataChange(this, film, changedFilm);
    });

    this._filmDetailsModal.setCloseModalButtonClickHandler(() => {
      remove(this._filmDetailsModal);
    });

    if (existingFilmPreviewCard !== null) {
      replace(this._filmPreviewCard, existingFilmPreviewCard);
    } else {
      render(this._container, this._filmPreviewCard, ElementPosition.BEFORE_END);
    }
  }
}

