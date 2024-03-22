import { clearClass } from "../utils/clearClass.js";

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
  swipe: false,
  touchMove: false,
});

(function () {
  let isRender = false;

  if (innerWidth < 961 && !isRender) {
    slickSlideMobile();
    isRender = true;
  }

  window.addEventListener("resize", () => {
    if (innerWidth < 961 && !isRender) {
      window.location.reload();
      isRender = true;
    } else if (innerWidth > 960 && isRender) {
      window.location.reload();
      isRender = false;
    }
  });
})();

function slickSlideMobile() {
  const slides = ["footer", "advantages", "support", "contacts", "gratitude"];
  const slideParent = scrollFullScroll[0].slick.$slides;
  slideParent.each((index, item) => {
    if (slides.includes(item.classList[0])) {
      scrollFullScroll.slick("slickRemove", index);
      item.style.display = "none";
    }
  });
  scrollFullScroll.slick("slickRemove", 3);
  scrollFullScroll.slick("setPosition");
}

// hide header

(function () {
  const dotsPage = document.querySelector(".page .slick-dots");
  const childrenDotsPage = dotsPage.children;

  function changeElement(index, indexParent) {
    if (
      childrenDotsPage[indexParent].className === "slick-active" &&
      indexParent === index
    ) {
      document.querySelector("header").style.zIndex = "0";
    } else {
      document.querySelector("header").style.zIndex = "10";
    }
  }

  function findElement(element, indexParent) {
    if (element.length > 0) {
      for (let index = 0; index < element.length; index++) {
        if (element[index].dataset.hideHeader) {
          changeElement(index, indexParent);
        }
      }
    }
  }

  if (childrenDotsPage) {
    for (let i = 0; i < childrenDotsPage.length; i++) {
      childrenDotsPage[i].addEventListener("click", () => {
        const allSlidePage =
          scrollFullScroll[0].children[0].children[0].children;
        findElement(allSlidePage, i);
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

let itemTabs = null;

function changeItemTabs() {
  let isRender = true;

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 640) {
      itemTabs = $(".tabs__items").slick("unslick");
      isRender = true;
    } else if (window.innerWidth < 640 && isRender) {
      itemTabs = $(".tabs__items").slick({
        arrows: false,
        dots: false,
        speed: 800,
        infinite: false,
        draggable: true,
        swipe: true,
        touchMove: true,
      });
      isRender = false;
    }
  });
}

changeItemTabs();

let opportunityCard = null;

if (window.innerWidth <= 960) {
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

function activeSlideCard() {
  let isRender = true;

  slider.find(".slick-slide").css("margin", "0 100px");

  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) {
      opportunityCard = $(".opportunity__cards").slick("unslick");
      isRender = true;
    } else if (window.innerWidth <= 960 && isRender) {
      opportunityCard = $(".opportunity__cards").slick({
        arrows: false,
        dots: false,
        swipe: true,
        variableWidth: true,
        draggable: true,
        touchMove: true,
        slidesToShow: 3,
      });
      isRender = false;
    }
  });
}

activeSlideCard();

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
  let isRender = true;

  //initial 0 slide
  const tabItem = document.querySelectorAll(".tabs__item");
  const activeTab = document.querySelectorAll(".slick-arrow");

  function initialBeginTab() {
    if (tabItem.length > 0) {
      if (window.innerWidth > 640) {
        tabItem[0].classList.add("active-tab");
        tabs.slick("goTo", 0);
      } else {
        tabItem[3].classList.add("active-tab");
        tabs.slick("goTo", 3);
      }
    }
  }

  initialBeginTab();

  function hungleChangingTab() {
    window.addEventListener("resize", (e) => {
      if (window.innerWidth <= 640 && tabItem.length > 3) {
        clearClass(tabItem, "active-tab");
        tabItem[3].classList.add("active-tab");
        tabs.slick("goTo", 3);
        isRender = true;
      } else if (window.innerHeight > 640 && isRender && tabItem.length > 3) {
        clearClass(tabItem, "active-tab");
        tabItem[0].classList.add("active-tab");
        tabs.slick("goTo", 0);
        isRender = false;
      }
    });
  }

  hungleChangingTab();

  function addHungleElements() {
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
  }

  setTimeout(() => {
    addHungleElements();
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
    const slide = scrollFullScroll.slick("getSlick").$slides;
    for (let index = 0; index < slide.length; index++) {
      menuElement.forEach((item, _) => {
        item.addEventListener("click", () =>
          hungleMoveSlide(slide, item, index)
        );
      });
    }
  }

  function hungleMoveSlide(slide, item, index) {
    document.querySelector("header").style.zIndex = "10";
    const elementGoTp = slide[index].dataset.tp;
    const nameElementGoTp = item.getAttribute("href").replace("#", "");
    if (nameElementGoTp === elementGoTp) {
      document
        .querySelector(".header__burger")
        .classList.remove("burger-active");
      document
        .querySelector(".header__body")
        .classList.remove("body-menu-active");
      scrollFullScroll.slick("goTo", index);
    }
  }
}

activeMenu();

scrollFullScroll.slick("setPosition");

//scroll down slide

function activeScrollDown() {
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
}

activeScrollDown();

// ;

new Swiper(".card", {
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
    elementsOpenPopup.forEach((item, _) => {
      item.addEventListener("click", () => openPopup(item));
    });

    function openPopup(item) {
      if (startPopup) {
        startPopup = false;
        if (document.querySelector(".active-popup"))
          document
            .querySelector(".active-popup")
            .classList.remove("active-popup");
        const path = item.dataset.pathPopup;
        const popup = document.querySelector(`.${path}`);

        closePopup(popup);

        document.querySelector(".page").style.overflowY = "hidden";
        document.body.style.overflowY = "auto";

        popup.classList.add("active-popup");
        setTimeout(() => {
          startPopup = true;
        }, 3000);
      }
    }

    function closePopup(popup) {
      const elementClose = document.querySelectorAll(".popup__close");
      if (elementClose.length > 0) {
        elementClose.forEach((item, _) => {
          item.addEventListener("click", () => {
            lockScroll();
            popup.classList.remove("active-popup");
          });
        });
      }
      popup.addEventListener("click", (e) => {
        if (e.target === popup || e.target === popup.firstChild) {
          lockScroll();
          popup.classList.remove("active-popup");
        }
      });
    }

    function lockScroll() {
      document.querySelector(".page").style.overflowY = "auto";
      document.body.style.overflowY = "hidden";
    }
  }

  //the show info about card signs

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
    getDataElementField();
  }

  function getDataElementField() {
    elementHideField.forEach((item, index) => {
      const img = item.children[0];
      const src = img.src;
      const dataSrc = img.dataset.src;
      const allInput = document.querySelectorAll(".form-field-active");
      const input = allInput[index];
      item.addEventListener("click", () =>
        hungleElementField(src, dataSrc, input, img)
      );
    });
  }

  function hungleElementField(src, dataSrc, input, img) {
    if (!input.matches('[class$="show-value"]')) {
      img.src = dataSrc;
      input.setAttribute("type", "password");
      input.classList.add("show-value");
    } else {
      img.src = src;
      input.setAttribute("type", "text");
      input.classList.remove("show-value");
    }
  }
})();

export { activeMenu };
