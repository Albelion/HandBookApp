import { uri } from "./appSettings.js";
import { createEmployee } from "./forms.js";
export function displayEmployees(response) {
  $("#mainTable").empty();
  const tableTitleNames = [
    "ФИО",
    "Организация",
    "Подразделение",
    "Должность",
    "Телефон",
    "Email",
  ];
  const headTr = document.createElement("tr");
  tableTitleNames.forEach((str) => {
    const th = document.createElement("th");
    th.innerText = str;
    headTr.appendChild(th);
  });
  $("#mainTable").append(headTr);
  response.forEach((val, ind) => {
    const bodytr = document.createElement("tr");
    const resultValues = Object.values(val);
    const buttonUpdate = document.createElement("button");
    $(buttonUpdate).click(function (e) {
      e.preventDefault();
      $(container).empty();
      createEmployee(val);
    });
    const buttonDelete = document.createElement("button");
    $(buttonDelete).click(function (e) {
      e.preventDefault();
      $.ajax({
        method: "DELETE",
        url: uri + `/${resultValues[0]}`,
        contentType: "application/json; charset=utf-8",
      }).done(function (resp) {
        console.log("Объект успешно удален");
        getAllData();
        console.log(resp);
      });
    });
    buttonDelete.innerText = "Удалить";
    $(buttonDelete).addClass("deleteButton");

    buttonUpdate.innerText = "Редактировать";
    $(buttonUpdate).addClass("updateButton");

    for (let i = 1; i < resultValues.length; i++) {
      const bodytd = document.createElement("td");
      bodytd.innerText = resultValues[i];
      bodytr.appendChild(bodytd);
    }
    const updatetd = document.createElement("td");
    updatetd.appendChild(buttonUpdate);

    const deletetd = document.createElement("td");
    deletetd.appendChild(buttonDelete);

    bodytr.appendChild(updatetd);
    bodytr.appendChild(deletetd);
    $("#mainTable").append(bodytr);
  });
}
export function getAllData() {
  $.ajax({
    method: "GET",
    url: uri,
    contentType: "application/json; charset=utf-8",
  }).done(function (response) {
    displayEmployees(response);
  });
}
