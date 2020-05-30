import AbstractComponent from "./abstract-component.js";

const createFooterStatisticsTemplate = (filmsCount) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsCount.toLocaleString(`ru`)} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCount);
  }
}
