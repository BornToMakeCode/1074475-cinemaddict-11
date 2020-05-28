import {createElement} from "../mock/utils.js";

const createFilmsNotFoundMessageTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class FilmsNotFoundMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsNotFoundMessageTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
