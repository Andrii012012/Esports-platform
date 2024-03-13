//рояль

const parentElement = document.querySelectorAll(".questions__item");

if (parentElement.length > 0) {
  activeAccordion();
}

function activeAccordion() {
  const infoDescription = document.querySelectorAll(".questions__description");
  const saveHeightElement = [];
  infoDescription.forEach((item, _) => {
    saveHeightElement.push(item.getBoundingClientRect().height),
      (item.style.maxHeight = "0px");
  });

  parentElement.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      infoDescription.forEach((item, _) =>
        item.classList.remove("questions__item-active")
      );
      if (parentElement[index].classList.contains("questions__item-active")) {
        parentElement.forEach((item, _) =>
          item.classList.remove("questions__item-active")
        );
        infoDescription.forEach((item, _) => (item.style.maxHeight = "0px"));
      } else {
        infoDescription.forEach((item, _) => (item.style.maxHeight = "0px"));
        parentElement.forEach((item, _) =>
          item.classList.remove("questions__item-active")
        );

        parentElement[index].classList.add("questions__item-active");
        infoDescription[index].style.maxHeight = `${
          saveHeightElement[index] * 2
        }px`;
      }
    });
  });
}
