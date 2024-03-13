

//burger menu

 const burger = document.querySelector('.header__burger');
  
   if(burger){
      activeBurger();
   }

     function activeBurger(){
         const menuBody = document.querySelector('.header__body');
          burger.addEventListener('click', () => {
              burger.classList.toggle('burger-active');
               menuBody.classList.toggle('body-menu-active');
          });
     }


   const header = document.querySelector('.header');
    const footer = document.querySelector('#footer'); 
    
     