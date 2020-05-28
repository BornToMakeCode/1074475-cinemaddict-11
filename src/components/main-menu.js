import {createElement} from "../mock/utils.js";

const createMenuItem = (item, isActive, isFiltered) => {
  return (
    `
    <a href="${item.link}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
      ${item.name}
      ${
    isFiltered ?
      `<span class="main-navigation__item-count">${item.count}</span>`
      : ``
    }
    </a>
    `
  );
};

const createMainMenuTemplate = (menuItems) => {
  const menuMarkup = menuItems.map((element, index) => createMenuItem(element, index === 0, index !== 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${menuMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
  );
};

export default class MainMenu {
  constructor(items) {
    this._items = items;
    this._element = null;
  }

  getTemplate() {
    return createMainMenuTemplate(this._items);
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
