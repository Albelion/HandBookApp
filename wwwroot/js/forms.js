import { getAllData } from "./displayEmloyee.js";
import { renderMainPage } from "./mainPageRender.js";
import { uri } from "./appSettings.js";

export function createEmployee(employeeUpdate) {
  // form page
  $("#container").addClass("wrapper");
  const innerWrapper = document.createElement("div");
   $(innerWrapper).addClass("innerWrapper");
   const formTitle = document.createElement("div"); 
   $(formTitle).addClass("formTitle");

  // поле ФИО
  const fullNameInput = document.createElement("input");
  fullNameInput.name = "fullName";
  fullNameInput.setAttribute("id", "fullName");
  // метка
  const fullNameLabel = document.createElement("label");
  fullNameLabel.setAttribute("for", "fullName");
  fullNameLabel.innerHTML = "ФИО:";

  // поле организации
  const organizationInput = document.createElement("input");
  organizationInput.name = "organization";
  organizationInput.setAttribute("id", "organization");
  // метка
  const organizationLabel = document.createElement("label");
  organizationLabel.setAttribute("for", "organization");
  organizationLabel.innerHTML = "Организация:";

  // поле подразделения
  const unitInput = document.createElement("input");
  unitInput.name = "unit";
  unitInput.setAttribute("id", "unit");
  // метка
  const unitLabel = document.createElement("label");
  unitLabel.setAttribute("for", "unit");
  unitLabel.innerHTML = "Подразделение:";

  // поле должности
  const positionInput = document.createElement("input");
  positionInput.name = "position";
  positionInput.setAttribute("id", "position");
  // метка
  const positionLabel = document.createElement("label");
  positionLabel.setAttribute("for", "position");
  positionLabel.innerHTML = "Должность:";

  // поле телефона
  const phoneNumberInput = document.createElement("input");
  phoneNumberInput.type = "tel";
  phoneNumberInput.name = "phoneNumber";
  phoneNumberInput.setAttribute("id", "phoneNumber");
  // метка
  const phoneNumberLabel = document.createElement("label");
  phoneNumberLabel.setAttribute("for", "phoneNumber");
  phoneNumberLabel.innerHTML = "Номер телефона:";

  // поле почты
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.setAttribute("id", "email");
  // метка
  const emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.innerHTML = "Электронная почта:";

  // элемент отправки данных формы
  const submitInput = document.createElement("input");
  $(submitInput).addClass("submitStyle");
  submitInput.value = "Отправить";
  submitInput.type = "submit";

  // если данные переданы, то вставляем в качестве значений по умолчанию
    if (employeeUpdate) {
        fullNameInput.value = employeeUpdate.fullName;
        organizationInput.value = employeeUpdate.organization;
        unitInput.value = employeeUpdate.unit;
        positionInput.value = employeeUpdate.position;
        phoneNumberInput.value = employeeUpdate.phoneNumber;
        emailInput.value = employeeUpdate.email;
        formTitle.innerHTML = "Редактирование данных о сотруднике";
    } else {
        formTitle.innerHTML = "Добавление нового сотрудника";
    }

  // добавление элементов
  innerWrapper.appendChild(formTitle);
  innerWrapper.appendChild(fullNameLabel);
  innerWrapper.appendChild(fullNameInput);
  innerWrapper.appendChild(organizationLabel);
  innerWrapper.appendChild(organizationInput);
  innerWrapper.appendChild(unitLabel);
  innerWrapper.appendChild(unitInput);
  innerWrapper.appendChild(positionLabel);
  innerWrapper.appendChild(positionInput);
  innerWrapper.appendChild(phoneNumberLabel);
  innerWrapper.appendChild(phoneNumberInput);
  innerWrapper.appendChild(emailLabel);
  innerWrapper.appendChild(emailInput);
  innerWrapper.appendChild(submitInput);

  // создание формы
  const myForm = document.createElement("form");
  myForm.setAttribute("id", "myForm");
  myForm.appendChild(innerWrapper);
  container.appendChild(myForm);

  $(myForm).on("submit", function (e) {
    e.preventDefault();
    // обязательные поля
    const fullName = myForm.elements.fullName.value;
    const organization = myForm.elements.organization.value;
    const unit = myForm.elements.unit.value;
    const position = myForm.elements.position.value;
    const email = myForm.elements.email.value;
    const phoneNumber = myForm.elements.phoneNumber.value;
    if (fullName && email && organization && position && unit && phoneNumber) {
      // проверка на содержания букв в строке ФИО
      if (/^[a-zA-Zа-яА-Я\s]*$/.test(fullName) == false) {
        alert('Ошибка! Поле "ФИО" должно состоять только из букв');
        // проверка на содержания букв в строке город проживания
      } else if (/^[a-zA-Zа-яА-Я\s]*$/.test(organization) == false) {
        alert('Ошибка! Поле "организация" должно состоять только из букв');
      } else if (/^[a-zA-Zа-яА-Я\s]*$/.test(unit) == false) {
        alert('Ошибка! Поле "подразделение" должно состоять только из букв');
      } else if (/^[a-zA-Zа-яА-Я\s]*$/.test(position) == false) {
        alert('Ошибка! Поле "должность" должно состоять только из букв');
      } else if (phoneNumber.length > 12 || phoneNumber.length < 11) {
        alert("Ошибка! Телефонный номер некорректен!");
      } else {
        const pleaseWait = document.createElement("div");
        pleaseWait.innerHTML = "Идет обработка данных, пожалуйста подождите...";
        myForm.remove();
        const employee = {
          FullName: fullName,
          Organization: organization,
          Unit: unit,
          Position: position,
          PhoneNumber: phoneNumber,
          Email: email,
        };
        // если данные переданы в функцию, выполняем обновление сотрудника
        if (employeeUpdate) {
          $.ajax({
            method: "PUT",
            url: uri + `/${employeeUpdate.id}`,
            data: JSON.stringify(employee),
            contentType: "application/json; charset=utf-8",
          }).done(function () {
            $("#container").empty();
            renderMainPage();
            getAllData();
          }).fail(function(resp){
            alert(resp.responseText);
            renderMainPage();
            getAllData();
          });
        } 
        // иначе добавляем сотрудника в базу 
        else {
          $.ajax({
            method: "POST",
            url: uri,
            data: JSON.stringify(employee),
            contentType: "application/json; charset=utf-8",
          }).done(function () {
            $("#container").empty();
            renderMainPage();
            getAllData();
          }).fail(function(resp){
            alert(resp.responseText);
            renderMainPage();
            getAllData();
          });
        }
      }
    } else {
      let emptyFields = [];
      if (!fullName) {
        emptyFields.push("ФИО пользователя");
      }
      if (!organization) {
        emptyFields.push("организация");
      }
      if (!unit) {
        emptyFields.push("подразделение");
      }
      if (!position) {
        emptyFields.push("должность");
      }
      if (!phoneNumber) {
        emptyFields.push("телефонный номер");
      }
      if (!email) {
        emptyFields.push("электронная почта");
      }
      if (emptyFields.length > 1) {
        let message = "Ошибка! Следующие поля не заполнены: ";
        for (let i = 0; i < emptyFields.length; i++) {
          message += emptyFields[i];
          if (i + 1 < emptyFields.length) message += ", ";
        }
        alert(message);
      } else {
        let message = "Ошибка! поле ";
        message += emptyFields[0] + " не заполнено";
      }
    }
  });
}
