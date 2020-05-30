import MainMenu from "./components/main-menu.js";
import UserRank from "./components/user-rank.js";
import Statistics from "./components/statistics.js";
// import FilmsListExtraContainer from "./components/films-list-extra-container.js";
import FooterStatistics from "./components/footer-statistics.js";
import {getRandomIntegerNumber} from "./utils/common.js";
import {ElementPosition, render} from "./utils/render.js";
import {getMenu} from "./mock/main-menu.js";
import {getStatisticsFilter} from "./mock/statistics.js";
import {getFilms} from "./mock/films.js";
import PageController from "./controllers/page-controller.js";

const ALL_FILMS_COUNT = 130291;
const FILMS_COUNT = 5;
// const TOP_RATED_FILMS_COUNT = 2;
// const MOST_COMMENTED_FILMS_COUNT = 2;

const startingPageNumber = 1;
const userRankId = getRandomIntegerNumber(0, 50);
const menuItems = getMenu();
const statisticsFilter = getStatisticsFilter();
const statistics = new Statistics(statisticsFilter);
const mainMenu = new MainMenu(menuItems);
const userRank = new UserRank(userRankId);
const footerStatistics = new FooterStatistics(ALL_FILMS_COUNT);

// const renderExtraFilmsSection = (container, title, filmsCount) => {
//   render(container, createFilmsListExtraContainerTemplate(title), ElementPosition.BEFORE_END);
//   const extraFilmsListElement = container.querySelector(`.films-list--extra:last-child .films-list__container`);
//   for (let i = 0; i < filmsCount; i++) {
//     render(extraFilmsListElement, createFilmPreviewCardTemplate(), ElementPosition.BEFORE_END);
//   }
// };

const bodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, mainMenu, ElementPosition.BEFORE_END);
render(siteMainElement, statistics, ElementPosition.BEFORE_END);
const statisticElement = siteMainElement.querySelector(`.statistic`);
render(statisticElement, userRank, ElementPosition.AFTER_BEGIN);
const filmCollection = getFilms(startingPageNumber, FILMS_COUNT);
const pageController = new PageController(siteMainElement);
pageController.render(filmCollection.items);
// renderExtraFilmsSection(filmsElement, `Top rated`, TOP_RATED_FILMS_COUNT);
// renderExtraFilmsSection(filmsElement, `Most commented`, MOST_COMMENTED_FILMS_COUNT);
const footer = bodyElement.querySelector(`.footer`);
render(footer, footerStatistics, ElementPosition.BEFORE_END);


