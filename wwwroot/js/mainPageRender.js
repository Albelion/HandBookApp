import { createEmployee } from "./forms.js";
import { displayEmployees } from "./displayEmloyee.js";
import { uri } from "./appSettings.js";

export function renderMainPage() {
  $("#container").addClass("wrapper");
  const searchInput = document.createElement("input");
  searchInput.name = "searchInput";
  searchInput.setAttribute("id", "searchInput");
  const searchButton = document.createElement("button");
  $(searchButton).addClass("iconButtonContainer");
  const iconElement = document.createElement("i");
  $(iconElement).addClass("fa-solid").addClass("fa-magnifying-glass");
  searchButton.appendChild(iconElement);

  // события нажатия клавиши 'Enter' и кнопки поиска по критерию
  $(searchInput).keypress(function (e) {
    if (e.which == '13') {
      getEmployeeBySearch();
      e.stopPropagation();
    }
  });
  $(searchButton).click(function (e) {
    e.preventDefault();
    getEmployeeBySearch();
  });

  // функция поиска сотрудника по критерию
  function getEmployeeBySearch() {
    const text = $(searchInput).val();
    if (text !== "") {
      $.ajax({
        method: "GET",
        url: uri + `/search?criteria=${text}`,
        contentType: "application/json; charset=utf-8",
      }).done(function (response) {
        if(response.length==0){
          $(".mainTitle").text("Сотрудники не найдены");
        }else{
          $(".mainTitle").text("Сотрудники");
          displayEmployees(response);
        }
      }).fail(function(resp){
        alert(resp.responseText);
    })
  }}
  // создание таблицы для вывода полей сотрудников
  const table = document.createElement("table");
  table.setAttribute("id", "mainTable");
  const searchWrapper = document.createElement("div");
  $(searchWrapper).addClass("searchWrapper");
  searchWrapper.appendChild(searchInput);
  searchWrapper.appendChild(searchButton);

  const mainPageWrapper = document.createElement("div");
  $(mainPageWrapper).addClass("mainPageWrapper");

  const titleMainPage = document.createElement("div");
  titleMainPage.innerHTML = "Cотрудники";
  $(titleMainPage).addClass("mainTitle");

  const buttonCreate = document.createElement("button");
  buttonCreate.innerText = "Добавить сотрудника";
  $(buttonCreate).addClass("createButton");
  $(buttonCreate).click(function (e) {
    e.preventDefault();
    $(container).empty();
    createEmployee();
  });
  mainPageWrapper.appendChild(searchWrapper);
  mainPageWrapper.appendChild(titleMainPage);
  mainPageWrapper.appendChild(table);
  mainPageWrapper.appendChild(buttonCreate);
  $("#container").append(mainPageWrapper);
}
