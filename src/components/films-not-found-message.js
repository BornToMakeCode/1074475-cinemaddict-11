import AbstractComponent from "./abstract-component.js";

const createFilmsNotFoundMessageTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class FilmsNotFoundMessage extends AbstractComponent {

  getTemplate() {
    return createFilmsNotFoundMessageTemplate();
  }
}
