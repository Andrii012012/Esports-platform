const formRegister = document.querySelector(".popup-register__form-sing");

if (formRegister) {
  formRegister.addEventListener("submit", (e) => hungleSubmitData(e));
}

function hungleSubmitData(e) {
  e.preventDefault();
  let result = validationField(
    document.querySelectorAll(".popup-register__form-sing .form-field"),
    document.querySelector(".popup-register__form-sing .form-custom-checkbox")
  );
  if (result) {
    massageAlert();
  }
}

function massageAlert() {
  const container = document.querySelector(".popup-register__container");
  const newElement = `
     <section class="massage-confirmation">
   <strong class="massage-confirmation__title">
      На указанный адрес отправлено письмо с подтверждением
   </strong>
  <p class="massage-confirmation__subtitle text-about">
    Перейдите по ссылке в письме, чтобы привязать адрес к вашему аккаунту
     </p>
    </section>
      `;
  container.insertAdjacentHTML("beforebegin", newElement);
  setTimeout(() => {
    document.querySelector(".massage-confirmation").remove();
  }, 5000);
}
