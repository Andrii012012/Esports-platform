const formRegister = document.querySelector(".popup-sing__form-sing");

if (formRegister) {
  formRegister.addEventListener("submit", (e) => hungleSubmitData(e));
}

function hungleSubmitData(e) {
  e.preventDefault();
  let result = validationField(
    document.querySelectorAll(".popup-sing__form-sing .form-field"),
    document.querySelector(".popup-sing__form-sing .form-custom-checkbox")
  );
}
