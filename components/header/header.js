//burger menu

const burger = document.querySelector(".header__burger");

if (burger) {
  activeBurger();
}

function activeBurger() {
  let isLock = true;
  const menuBody = document.querySelector(".header__body");
  burger.addEventListener("click", () => {
    burger.classList.toggle("burger-active");
    menuBody.classList.toggle("body-menu-active");
    if (isLock) {
      document.querySelector(".page").style.overflowY = "hidden";
      isLock = false;
    } else {
      document.querySelector(".page").style.overflowY = "auto";
      isLock = true;
    }
  });
}

const header = document.querySelector(".header");
const footer = document.querySelector("#footer");
