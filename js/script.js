const carrousel = document.querySelectorAll('.carrousel__img');
const carrouselPrev = document.getElementById('carrousel__prev');
const carrouselNext = document.getElementById('carrousel__next');
const hamb = document.getElementById('header__hamb');
const hamb_close = document.getElementById('mobile__close');
const mobile_wrapper = document.getElementById('mobile__wrapper');
const mobilew = document.getElementById('mobile');

let slide = 0;

carrouselNext.addEventListener('click', () => {
   carrousel[slide].classList.remove('active');
   slide++;
   if (slide > carrousel.length - 1) {
      slide = carrousel.length - 1;
   }
   carrousel[slide].classList.add('active');
});

carrouselPrev.addEventListener('click', () => {
   carrousel[slide].classList.remove('active');
   slide--;
   if (slide < 0) {
      slide = 0;
   }
   carrousel[slide].classList.add('active');
});

hamb.addEventListener('click', () => {
   mobile_wrapper.classList.add('mobile__active');
   mobilew.classList.add('mobile__active');
});

hamb_close.addEventListener('click', () => {
   mobile_wrapper.classList.remove('mobile__active');
   mobilew.classList.remove('mobile__active');
});
