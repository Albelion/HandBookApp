import { renderMainPage } from "./mainPageRender.js";
import { getAllData } from "./displayEmloyee.js";
$(document).ready(function () {
  // рендер элементов главной страницы
  renderMainPage();
  // загрузка данных с сервера
  getAllData();
});
