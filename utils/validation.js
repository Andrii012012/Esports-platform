function getBorderColor(styleBorder) {
  const symbol = styleBorder.split(" ");
  const color = [];
  for (let i = 2; i < symbol.length; i++) {
    color.push(symbol[i]);
  }
  return color.join("");
}

function changeStyleInput(element, timeClear) {
  if (element.type !== "checkbox") {
    let colorBorder = getBorderColor(getComputedStyle(element).border);
    element.style.border = "1px solid rgba(240, 68, 81, 1)";
    setTimeout(() => {
      element.style.border = `1px solid ${colorBorder}`;
    }, timeClear);
  } else {
    const parentCheckBox = element.closest(".custom-checkbox");
    let colorBorder = getBorderColor(getComputedStyle(parentCheckBox).border);
    parentCheckBox.style.border = "1px solid rgba(240, 68, 81, 1)";
    setTimeout(() => {
      parentCheckBox.style.border = `1px solid ${colorBorder}`;
    }, timeClear);
  }
}

function setMassageError(element, text, className, timeClear) {
  if (!element.matches(`[class$='${className}']`)) {
    element.classList.add(`${className}`);
    const massageError = `
             <div class='massage-error'>
             <p>
               ${text}
                </p>
              </div>
           `;

    element
      .closest(".wrapper-field")
      .insertAdjacentHTML("afterend", massageError);

    setTimeout(() => {
      element.classList.remove(`${className}`);
      document.querySelector(".massage-error").remove();
    }, timeClear);
  }
}

function validationField(inputs, checkbox = null, timeClear = 4000) {
  let start = true;
  const truth = [];
  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    switch (element.name) {
      case "email": {
        let validationEmail =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!validationEmail.test(String(element.value).toLowerCase())) {
          changeStyleInput(element, timeClear);
          setMassageError(
            element,
            "Веддите email!",
            "massage-error-email",
            timeClear
          );
          truth.push(false);
        } else {
          truth.push(true);
        }
        break;
      }
      case "password": {
        if (element.value === "" || element.value.length < 3) {
          changeStyleInput(element, timeClear);
          setMassageError(
            element,
            "Неверный пароль!",
            "massage-error-sing-password",
            timeClear
          );
          truth.push(false);
        } else {
          truth.push(true);
        }
        break;
      }
      case "create-password": {
        if (
          element.value === "" ||
          element.value.length < 6 ||
          element.value.length > 18
        ) {
          changeStyleInput(element, timeClear);
          setMassageError(
            element,
            "Пароль должен состоять от 6 до 18 символов, используя строчный и заглавные буквы A-z",
            "massage-error-create-password",
            timeClear
          );
          truth.push(false);
        } else {
          truth.push(true);
        }
        break;
      }
      case "repeat-password": {
        if (element.value === "") {
          changeStyleInput(element, timeClear);
          setMassageError(
            element,
            "Пароли не совпадают!",
            "massage-error-values-​​match",
            timeClear
          );
          truth.push(false);
        } else {
          truth.push(true);
        }
        break;
      }
      case "name": {
        if (
          element.value === "" ||
          element.value.length < 2 ||
          element.value.length > 24
        ) {
          changeStyleInput(element, timeClear);
          setMassageError(
            element,
            'Никнейм должен содержать от 3 до 24 латинских символов. Разрешены "_" ".".',
            "massage-error-name",
            timeClear
          );
          truth.push(false);
        } else {
          truth.push(true);
        }
        break;
      }
    }
  }

  if (checkbox) {
    if(checkbox.checked){
      truth.push(true);
    } else {
      changeStyleInput(checkbox, timeClear);
      truth.push(false);
    }
  }

  for (let i = 0; i < truth.length; i++) {
    if (truth[i] == false) {
      start = false;
    }
  }
  return start;
}

// export default validationField;
