const carrousel = document.querySelectorAll('.carrousel__img');
const carrouselPrev = document.querySelector('.carrousel__prev');
const carrouselNext = document.querySelector('.carrousel__next');
const hamb = document.getElementById('header__hamb');
const hamb_close = document.getElementById('mobile__close');
const mobile_wrapper = document.getElementById('mobile__wrapper');
const mobilew = document.getElementById('mobile');
const carrito = document.getElementById('carrito');
const carritoInner = document.getElementById('carrito-inner');
const aside = document.getElementById('aside');
const path = document.getElementById('path');
const plusCantidad = document.getElementById('plusCantidad');
const minCantidad = document.getElementById('minCantidad');
const cantidad = document.getElementById('cantidad');
const headerCantidad = document.querySelector('.header__carrito__num');
const btnAddToCart = document.getElementById('addToCart');
const prod__container = document.getElementById('prodCarr__container');
const btn = document.querySelector('.btn');
const imagenGaleria = document.querySelector('.gallery__big');
const imagenesGaleria = document.querySelectorAll('.gallery__img');

let slide = 0;
let contCantidad = 0;
addToCart();

carrouselNext.addEventListener('click', () => {
   carrousel[slide].classList.remove('active');
   slide++;
   if (slide > carrousel.length - 1) {
      slide = 0;
   }
   carrousel[slide].classList.add('active');
});

carrouselPrev.addEventListener('click', () => {
   carrousel[slide].classList.remove('active');
   slide--;
   if (slide < 0) {
      slide = carrousel.length - 1;
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

carrito.addEventListener('click', () => {
   aside.classList.toggle('opacity');
   carritoInner.classList.toggle('carrito-activo');
   if (aside.style.pointerEvents == 'unset') {
      aside.style.pointerEvents = 'none';
   } else aside.style.pointerEvents = 'unset';

   path.classList.toggle('pathcarrito');
});

plusCantidad.addEventListener('click', () => {
   contCantidad++;
   actualizarCantidad(contCantidad);
});

minCantidad.addEventListener('click', () => {
   contCantidad--;
   if (contCantidad < 0) {
      contCantidad = 0;
   }
   actualizarCantidad(contCantidad);
});

btnAddToCart.addEventListener('click', () => {
   addToCart();
});

imagenesGaleria.forEach((i) => {
   i.addEventListener('click', () => {
      imagenesGaleria.forEach((ig) => {
         ig.classList.remove('gallery__active');
         ig.parentNode.classList.remove('gallery__border');
      });
      i.classList.add('gallery__active');
      i.parentNode.classList.add('gallery__border');
      let ruta = i.getAttribute('src');
      let rutaCortada = ruta.slice(0, ruta.length - 14);
      let rutaFinal = rutaCortada + '.jpg';
      imagenGaleria.setAttribute('src', `${rutaFinal}`);
   });
});

imagenGaleria.addEventListener('click', () => {});

// imagenesGaleria.addEventListener('click', () => {
//    // let ruta = imagenesGaleria.getAttribute('src');
// });

function actualizarCantidad(cant) {
   cantidad.innerHTML = cant;
}

function addToCart() {
   btn.classList.remove('hidden');
   prod__container.innerHTML = '';
   let cantActual = getCantidad();
   if (cantActual === null) {
      cantActual = 0;
   }
   const cantInner = cantidad.innerHTML;
   cantidad.innerHTML = 0;
   contCantidad = 0;
   const cantLS = parseInt(cantInner) + cantActual;
   localStorage.setItem('cant', cantLS);
   headerCantidad.innerHTML = cantLS;
   const precio = (125 * cantLS).toFixed(2);

   if (cantLS != 0) {
      const div = document.createElement('div');
      div.classList.add('cproducto-wrapper');
      div.innerHTML = `<div class="cproducto">
                     <img
                        class="cproducto__img"
                        src="./images/image-product-1-thumbnail.jpg"
                        alt=""
                     />
                     <span class="cproducto__nomb">Autumn Limited Edition Sneakers</span>
                     <span class="cproducto__precio"
                        >$125.00 x ${cantLS} <span class="cproducto__total"> $${precio}</span>
                     </span>
                  </div>
                  <img class="delete" src="./images/icon-delete.svg" alt="" />
`;

      const deleteBtn = div.querySelector('.delete');
      deleteBtn.addEventListener('click', () => {
         div.remove();
         localStorage.setItem('cant', 0);
         headerCantidad.innerHTML = 0;
         emptyCart();
      });
      prod__container.appendChild(div);
   } else {
      emptyCart();
   }
}

function emptyCart() {
   prod__container.innerHTML = '';
   const empty = document.createElement('div');
   empty.classList.add('carroVacio');
   empty.innerHTML = 'Your cart is empty.';
   prod__container.appendChild(empty);
   btn.classList.add('hidden');
}

function getCantidad() {
   const cantActLS = JSON.parse(localStorage.getItem('cant'));
   return cantActLS;
}
