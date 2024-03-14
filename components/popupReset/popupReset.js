const formRecovery = document.querySelector(".form-reset");

if (formRecovery) {
  formRecovery.addEventListener("submit", (e) => hungleSubmitRecovery(e));
}

function hungleSubmitRecovery(e) {
  e.preventDefault();
  let result = validationField(
    document.querySelectorAll(".form-reset .form-field"),
    document.querySelector(".form-reset .form-custom-checkbox")
  );
  if (result) {
    recoveryBlock();
  }
}

function recoveryBlock() {
  let time = 37;
  let startTime = true;
  let timeRepeatActive = 37000;

  const inputEmail = document.getElementById("form-reset__email");
  const elementBody = document.querySelector(".form-reset__email-body");

  const newElement = `
    <section class='checking'>
     <p class='checking__text popup-text-info'>На почту <span>${inputEmail.value}</span> отправлен код для восстановления пароля</p>
    <div class="checking__body checking-code">
      <p class="checking-code__text text-about">Введите 4-x значный код:</p>
      <input class="checking-code__input form-field" maxlength="1" type="text" name="code">
      <input class="checking-code__input form-field" maxlength="1" type="text" name="code">
      <input class="checking-code__input form-field" maxlength="1" type="text" name="code">
      <input class="checking-code__input form-field" maxlength="1" type="text" name="code">
     </div>
      <p class="checking__repeat-call popup-text-info">Запросить снова <span id='checking__time'>00:${time}</span></p>
       <p class='checking__error popup-text-info'>Неверный код!<p>
    </section>
  `;

  elementBody.insertAdjacentHTML("afterend", newElement);

  if (startTime) {
    startTime = false;
    const decrementTime = setInterval(() => {
      renderTime(decrementTime, startTime);
    }, 1000);
    setTimeout(() => {
      startTime = true;
    }, timeRepeatActive);
  }

  function renderTime(decrementTime) {
    time--;
    const element = document.getElementById("checking__time");
    element.innerHTML = `00:${time}`;
    if (time < 1) {
      time = 37;
      clearInterval(decrementTime);
    }
  }
}
