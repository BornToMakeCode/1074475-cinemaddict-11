import {createElement} from "../utils/render.js";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`AbstractComponent is an abstract class. Abstract class can't be instantiated`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method getTemplate is not implemented`);
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
