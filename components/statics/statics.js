'use strict';
//clear margin-bottom for last item list

 (function () {
   const element = document.querySelectorAll('.statics__item'); 
    const lengthElement = element.length - 1;
    element.forEach((item, index) => {
       if(lengthElement == index) {
         item.style.marginBottom = '0px';
       }
    })
 })();