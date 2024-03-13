import validationField from "../utils/validation.js";
import { clearClass } from "../utils/clearClass.js";

function render(func, delay) {
  if (render.isRender) {
    render.isRender = false;
    func();
    setTimeout(() => {
      render.isRender = true;
    }, delay);
  }
}

render.isRender = true;

//global Swiper

$(document).ready(function () {});

let scrollFullScroll = $(".page").slick({
  arrows: false,
  dots: true,
  speed: 800,
  easing: "linear",
  infinite: false,
  initialSlide: 0,
  vertical: true,
  draggable: false,
});

// hide header

(function () {
  const dotsPage = document.querySelector(".page .slick-dots");
  const childrenDotsPage = dotsPage.children;
  if (childrenDotsPage) {
    console.log(childrenDotsPage);
    for (let i = 0; i < childrenDotsPage.length; i++) {
      childrenDotsPage[i].addEventListener("click", () => {
        const allSlidePage =
          scrollFullScroll[0].children[0].children[0].children;
        if (allSlidePage.length > 0) {
          for (let index = 0; index < allSlidePage.length; index++) {
            if (allSlidePage[index].dataset.hideHeader) {
              if (
                childrenDotsPage[i].className === "slick-active" &&
                i === index
              ) {
                document.querySelector("header").style.zIndex = "0";
              } else {
                document.querySelector("header").style.zIndex = "10";
              }
            }
          }
        }
      });
    }
  }
})();

let slider = $(".card-info").slick({
  arrows: true,
  dots: true,
  speed: 800,
  easing: "linear",
  initialSlide: 0,
  centerMode: true,
  variableWidth: true,
});

let tabs = $(".choose__body-tabs").slick({
  arrows: true,
  speed: 800,
  easing: "linear",
  initialSlide: 0,
  appendArrows: ".choose__tabs",
  responsive: [
    {
      breakpoint: 641,
      settings: {
        arrows: false,
      },
    },
  ],
});

let itemTabs = $(".tabs__items").slick({
  arrows: false,
  dots: false,
  speed: 800,
  infinite: false,
  draggable: true,
  swipe: true,
  touchMove: true,
});

slider.find(".slick-slide").css("margin", "0 100px");

window.addEventListener("resize", function () {
  if (window.innerWidth > 960) {
    $(".opportunity__cards").slick("unslick");
  } else if (window.innerWidth <= 960) {
    $(".opportunity__cards").slick({
      arrows: false,
      dots: false,
      swipe: true,
      variableWidth: true,
      draggable: true,
      touchMove: true,
      slidesToShow: 3,
    });
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth >= 640) {
    itemTabs = $(".tabs__items").slick("unslick");
  } else {
    itemTabs = $(".tabs__items").slick({
      arrows: false,
      dots: false,
      speed: 800,
      infinite: false,
      draggable: true,
      swipe: true,
      touchMove: true,
    });
  }
});

let gratitudeSlide = $(".gratitude-table").slick({
  arrows: true,
  dots: false,
  speed: 800,
  draggable: true,
  swipe: true,
  loop: true,
  initialSlide: 0,
  touchMove: true,
  slidesToShow: 4,
  appendArrows: ".gratitude__body-gratitude-table",

  responsive: [
    {
      breakpoint: 361,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 641,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 961,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
});

gratitudeSlide.slick("setPosition");

slider.slick("setPosition");

//tabs

function findActiveSlide() {
  let delay = 1000;
  //initial 0 slide
  const tabItem = document.querySelectorAll(".tabs__item");
  if (window.innerWidth > 640) {
    tabItem[0].classList.add("active-tab");
    tabs.slick("goTo", 0);
  } else {
    tabItem[3].classList.add("active-tab");
    tabs.slick("goTo", 3);
  }
  window.addEventListener("resize", (e) => {
    if (window.innerWidth <= 640) {
      clearClass(tabItem, "active-tab");
      tabItem[3].classList.add("active-tab");
      tabs.slick("goTo", 3);
      render(findActiveSlide, delay);
    } else {
      clearClass(tabItem, "active-tab");
      tabItem[0].classList.add("active-tab");
      tabs.slick("goTo", 0);
      render(findActiveSlide, delay);
    }
  });

  //find all arrow
  setTimeout(() => {
    const activeTab = document.querySelectorAll(".slick-arrow");
    if (activeTab.length > 0) {
      for (let element = 0; element < activeTab.length; element++) {
        activeTab[element].addEventListener("click", findActiveTab);
      }
      if (tabItem.length > 0) {
        for (let element = 0; element < tabItem.length; element++) {
          tabItem[element].addEventListener("click", () => {
            tabs.slick("goTo", element);
            findActiveTab();
          });
        }
      }
    }
  }, 100);
}

findActiveSlide();

function findActiveTab() {
  const tabItem = document.querySelectorAll(".tabs__item");
  const tab = document.querySelectorAll(".choose__tab");
  if (tab.length > 0) {
    for (let element = 0; element < tab.length; element++) {
      const activeElement = tab[element];
      if (activeElement.classList.contains("slick-active")) {
        document.querySelector(".active-tab").classList.remove("active-tab");
        const idDescription = activeElement.id;
        tabItem.forEach((item, _) => {
          const idSection = item.dataset.tab;
          if (idDescription == idSection) {
            item.classList.add("active-tab");
          }
        });
      }
    }
  }
}

//menu navigator

function activeMenu() {
  const menuElement = document.querySelectorAll(".item-navigator");

  if (menuElement.length > 0) {
    menuActive();
  }

  function menuActive() {
    const elementSlide = scrollFullScroll.slick("getSlick").$slides;
    for (let i = 0; i < elementSlide.length; i++) {
      menuElement.forEach((item, _) => {
        item.addEventListener("click", (e) => {
          document.querySelector("header").style.zIndex = "10";
          const elementGoTp = elementSlide[i].dataset.tp;
          const nameElementGoTp = item.getAttribute("href").replace("#", "");
          if (nameElementGoTp === elementGoTp) {
            scrollFullScroll.slick("goTo", i);
          }
        });
      });
    }
  }
}

activeMenu();

scrollFullScroll.slick("setPosition");

//scroll down slide

const scrollDown = document.querySelectorAll(".scroll-down");

if (scrollDown.length > 0) {
  scrollToGo();
}

function scrollToGo() {
  scrollDown.forEach((item, index) => {
    item.addEventListener("click", () => {
      let indexIncrement = index + 1;
      scrollFullScroll.slick("goTo", indexIncrement);
    });
  });
}
// ;

let swiper = new Swiper(".card", {
  slidesPerView: "auto",
  effect: "coverflow",
  loop: true,
  initialSlide: 1,
  centeredSlides: true,
  navigation: {
    nextEl: ".card__button-next",
    prevEl: ".card__button-prev",
  },

  coverflowEffect: {
    rotate: 0,
    stretch: -20,
    depth: 200,
    modifier: 3,
    slideShadows: false,
  },

  breakpoints: {
    641: {
      coverflowEffect: {
        rotate: 0,
        stretch: -20,
        depth: 200,
        modifier: 3,
        slideShadows: false,
      },
    },
    361: {
      coverflowEffect: {
        rotate: 0,
        stretch: 38,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      },
    },
    320: {
      coverflowEffect: {
        rotate: 0,
        stretch: 60,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      },
    },
  },
  observer: true,
  observerParent: true,
  observerSlideChildren: true,
  centerMode: true,
});

//popup

(function () {
  const allPopup = document.querySelectorAll(".popup");

  let startPopup = true;

  if (allPopup.length > 0) {
    initialPopup();
  }

  function initialPopup() {
    const elementsOpenPopup = document.querySelectorAll(".popup-active");
    elementsOpenPopup.forEach((item, index) => {
      item.addEventListener("click", (event) => openPopup(event, item));
    });

    function openPopup(event, item) {
      if (startPopup) {
        startPopup = false;
        if (document.querySelector(".active-popup"))
          document
            .querySelector(".active-popup")
            .classList.remove("active-popup");
        const elementClose = document.querySelectorAll(".popup__close");
        const path = item.dataset.pathPopup;
        const popup = document.querySelector(`.${path}`);

        if (elementClose.length > 0) {
          elementClose.forEach((item, _) => {
            item.addEventListener("click", (e) => {
              popup.classList.remove("active-popup");
            });
          });
        }

        popup.classList.add("active-popup");
        popup.addEventListener("click", (e) => {
          if (e.target === popup || e.target === popup.firstChild) {
            popup.classList.remove("active-popup");
          }
        });
        setTimeout(() => {
          startPopup = true;
        }, 3000);
      }
    }
  }

  const elementCardStatics = document.querySelectorAll("[data-explain]");

  if (elementCardStatics.length > 0) {
    initialDescriptionStatics();
  }

  function initialDescriptionStatics() {
    elementCardStatics.forEach((item, _) => {
      item.addEventListener("click", () => {
        if (item.matches('[class$="active-popup-description"')) {
          clearClass(elementCardStatics, "active-popup-description");
        } else {
          clearClass(elementCardStatics, "active-popup-description");
          item.classList.add("active-popup-description");
        }
      });
    });
  }
})();

//parallax effect for fragments

(function () {
  document.addEventListener("mousemove", parallax);

  function parallax(e) {
    this.querySelectorAll(".img-fragment").forEach((item, index) => {
      const speed = item.dataset.speed;
      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerWidth - e.pageY * speed) / 100;
      item.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
})();

//custom checkbox

(function () {
  const customCheckBox = document.querySelectorAll(".custom-checkbox");

  if (customCheckBox.length > 0) {
    activeCheckBox();
  }

  function activeCheckBox() {
    customCheckBox.forEach((item, _) => {
      item.addEventListener("click", () => {
        const checkBox = item.children[0];
        if (checkBox.checked) {
          item.classList.add("active-checkBox");
        } else {
          item.classList.remove("active-checkBox");
        }
      });
    });
  }
})();

//hide value of fields

(function () {
  const elementHideField = document.querySelectorAll(".hide-value");

  if (elementHideField.length > 0) {
    hideOrShowElement();
  }

  function hideOrShowElement() {
    elementHideField.forEach((item, index) => {
      const img = item.children[0];
      const src = img.src;
      const dataSrc = img.dataset.src;
      const allInput = document.querySelectorAll(".form-field-active");
      const input = allInput[index];
      item.addEventListener("click", () => {
        if (!input.matches('[class$="show-value"]')) {
          img.src = dataSrc;
          input.setAttribute("type", "password");
          input.classList.add("show-value");
        } else {
          img.src = src;
          input.setAttribute("type", "text");
          input.classList.remove("show-value");
        }
      });
    });
  }
})();

//validation fields

(function () {
  let time = 37;

  let timeRepeatActive = 37000;

  const allForms = document.querySelectorAll(".form-popup");

  let timeGoValidation = 5001;

  let isValidation = true;

  let startTime = true;

  if (allForms.length > 0) {
    validationForm();
  }

  function validationForm() {
    for (let i = 0; i < allForms.length; i++) {
      allForms[i].addEventListener("submit", (e) => {
        e.preventDefault();
        let next = false;
        const validationInput = document.querySelectorAll(
          ".active-popup .form-field"
        );

        const validationCheckbox = document.querySelectorAll(
          ".active-popup .check-checkbox"
        );

        if (validationInput.length > 0) {
          if (isValidation) {
            next = validationField(validationInput, validationCheckbox, 5000);
            isValidation = false;
            setTimeout(() => {
              isValidation = true;
            }, timeGoValidation);
          }
        }

        if (next) {
          const formRegister = document.querySelector(".form-register");
          const formReset = document.querySelector(".form-reset");

          if (e.target === formReset) {
            const elementBody = document.querySelector(
              ".form-reset__email-body"
            );
            elementBody.classList.add("popup-body-active");
            const inputEmail = document.getElementById("form-reset__email");
            if (!document.querySelector(".checking")) {
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
            }
            if (startTime) {
              startTime = false;
              const decrementTime = setInterval(() => {
                renderTime(decrementTime, startTime);
              }, 1000);
              setTimeout(() => {
                startTime = true;
              }, timeRepeatActive);
            }
          }

          if (e.target === formRegister) {
            const container = document.querySelector(
              ".popup-register__container"
            );
            if (container) {
              if (!document.querySelector(".massage-confirmation")) {
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
            }
          }
        }
      });
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
})();


export { activeMenu };
