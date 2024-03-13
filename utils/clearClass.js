

function clearClass(elements, className) {
    elements.forEach((item, _) => {
      item.classList.remove(`${className}`);
    });
  }

  export {clearClass};