import {createElement} from "../mock/utils.js";

const createFooterStatisticsTemplate = (filmsCount) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsCount.toLocaleString(`ru`)} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCount);
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
