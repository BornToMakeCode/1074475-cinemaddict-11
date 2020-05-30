import MainMenu from "./components/main-menu.js";
import UserRank from "./components/user-rank.js";
import Statistics from "./components/statistics.js";
import FooterStatistics from "./components/footer-statistics.js";
import {getRandomIntegerNumber} from "./utils/common.js";
import {ElementPosition, render} from "./utils/render.js";
import {getMenu} from "./mock/main-menu.js";
import {getStatisticsFilter} from "./mock/statistics.js";
import {getFilms} from "./mock/films.js";
import PageController from "./controllers/page-controller.js";

const ALL_FILMS_COUNT = 130291;
const FILMS_COUNT = 5;
const startingPageNumber = 1;
const userRankId = getRandomIntegerNumber(0, 50);
const menuItems = getMenu();
const statisticsFilter = getStatisticsFilter();
const statistics = new Statistics(statisticsFilter);
const mainMenu = new MainMenu(menuItems);
const userRank = new UserRank(userRankId);
const footerStatistics = new FooterStatistics(ALL_FILMS_COUNT);
const bodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, mainMenu, ElementPosition.BEFORE_END);
render(siteMainElement, statistics, ElementPosition.BEFORE_END);
const statisticElement = siteMainElement.querySelector(`.statistic`);
render(statisticElement, userRank, ElementPosition.AFTER_BEGIN);
const filmCollection = getFilms(startingPageNumber, FILMS_COUNT);
const pageController = new PageController(siteMainElement);
pageController.render(filmCollection.items);
const footer = bodyElement.querySelector(`.footer`);
render(footer, footerStatistics, ElementPosition.BEFORE_END);


