import {createElement} from "../mock/utils.js";

const createStatsFilter = (name, isChecked) => {
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${name}" value="${name}" ${isChecked ? `checked` : ``}>
    <label for="statistic-${name}" class="statistic__filters-label">${name}</label>`
  );
};

const createStatisticsTemplate = (statisticsFilter) => {
  const filterMarkup = statisticsFilter.map((element, index) => createStatsFilter(element.name, index === 0)).join(`\n`);

  return (
    `<section class="statistic">
        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
          ${filterMarkup}
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">Sci-Fi</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>

      </section>`
  );
};

export default class Statistics {
  constructor(statisticsFilter) {
    this._statisticsFilter = statisticsFilter;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._statisticsFilter);
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
