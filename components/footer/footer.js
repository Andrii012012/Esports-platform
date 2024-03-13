import { activeMenu } from "../../js/index.js";


function render(func, delay){
  if(render.isRender){
     render.isRender = false;
    func();
    setTimeout(() => {
      render.isRender = true;
    }, delay);
  }
}

render.isRender = true;


(function (){
  let delay = 1000;
  let start = true;

  const parentMenu = document.querySelector(".footer__navigator");
  let parentClone = parentMenu.cloneNode(true);
  let listsMenu = parentClone.children[1];
  let listsMenuClone = listsMenu.cloneNode(true);
  let listMenu1 = parentMenu.children[1].children[0];
  let listMenu2 = parentMenu.children[1].children[1];
  let listMenu3 = parentMenu.children[1].children[2];
  let logo = parentMenu.children[0];

  const parentParentMenu = document.querySelector(".footer__content");
  let saveAdaptive640 = true;
  let saveAdaptive450 = true;

  if (window.innerWidth <= 640 && window.innerWidth > 450) {
    adaptive640();
  } else if (window.innerWidth <= 450) {
    adaptive450();
  }

  function adaptive640() {
    if (saveAdaptive640) {
      if (document.querySelector(".footer__navigator"))
        document
          .querySelectorAll(".footer__navigator")
          .forEach((item) => item.remove());
      const childrenElement = parentMenu.children;
      const logoClone = childrenElement[0].cloneNode(true);

      logoClone.classList.remove("footer__logo");

      const itemsMenuClone = listsMenuClone.cloneNode(true);

      if (itemsMenuClone.children[2]) itemsMenuClone.children[2].remove();

      const newParent = document.createElement("nav");
      newParent.classList.add("footer__navigator");

      const newStructure = document.createElement("ul");
      const newStructureTwo = document.createElement("ul");
      newStructureTwo.classList.add("footer__body-list");
      newStructure.classList.add("footer__menu-items");

      const newLi = document.createElement("li");
      newLi.classList.add("footer__logo");

      newLi.appendChild(logo);
      newStructure.appendChild(newLi);
      newStructure.appendChild(listMenu3);
      newStructureTwo.appendChild(listMenu1);
      newStructureTwo.appendChild(listMenu2);
      newParent.appendChild(newStructure);
      newParent.appendChild(newStructureTwo);

      parentParentMenu.insertAdjacentElement("afterbegin", newParent);
    }
  }

  function adaptive450() {
    if (saveAdaptive450) {
      if (document.querySelector(".footer__navigator"));
        document
          .querySelectorAll(".footer__navigator")
          .forEach((item) => item.remove());
      const newParentMenu = document.createElement("nav");
      newParentMenu.classList.add("footer__navigator");
      const newElementParent = document.createElement("div");
      const parentListsOne = document.createElement("ul");
      const parentListsTwo = document.createElement("ul");
      const parentListsThree = document.createElement("ul");
      parentListsOne.classList.add("footer__list");
      parentListsTwo.classList.add("footer__list");
      parentListsThree.classList.add(
        "footer__list",
        "footer__social-media"
      );
      newElementParent.classList.add("footer__body-menu");

      parentListsOne.append(logo);
      parentListsOne.append(listMenu2);

      parentListsTwo.append(listMenu1);
      newElementParent.append(parentListsOne);
      newElementParent.append(parentListsTwo);

      newParentMenu.append(newElementParent);

      parentListsThree.append(listMenu3);

      newParentMenu.append(parentListsThree);

      parentParentMenu.insertAdjacentElement("afterbegin", newParentMenu);
    }
  }

  window.addEventListener("resize", (event) => menuChange(event));

  function menuChange(e) {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 640 && window.innerWidth > 450) {
        adaptive640();
        render(activeMenu, delay);
        saveAdaptive640 = false;
        saveAdaptive450 = true;
      } else if (window.innerWidth <= 450) {
        adaptive450();
        render(activeMenu, delay);
        saveAdaptive640 = true;
        saveAdaptive450 = false;
      } else {
        document
          .querySelectorAll(".footer__navigator")
          .forEach((item) => item.remove());
        if (window.innerWidth >= 451) {
          parentParentMenu.insertAdjacentElement("afterbegin", parentClone);
        } else if (window.innerWidth >= 641) {
          parentParentMenu.insertAdjacentElement("afterbegin", parentClone);
        }
        saveAdaptive640 = true;
        saveAdaptive450 = true;
        render(activeMenu, delay);
      }
    });
  }
  menuChange();
})();


