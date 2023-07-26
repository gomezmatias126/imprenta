// document.cookie = 'third_party_var=value; SameSite=None; Secure';
// document.cookie = 'third_party_var=metriplica; SameSite=None; Secure';


const main = document.getElementById('main');

// ------------------------Header . Navbar---------------------
const header = document.getElementById('header');
const btn_menu = document.getElementById('btn_menu');
const overlay = document.getElementById('overlay');
const nav_links = document.querySelectorAll('.link');
function remove_disabled() { nav_links.forEach(ese => ese.classList.remove('disabled'))}
const incluir = (par=>{
  includeHTML(par)
  .then(html=>{
    main.innerHTML = html;})
    .catch(err =>{
      console.log(err);
    })
    load_assets(par);
    scrollTo(0,0);
  })
nav_links.forEach((elem)=>{
  elem.addEventListener('click', (e)=>{
    e.preventDefault();
    remove_disabled();
    e.target.classList.toggle('disabled');
    incluir(e.target.id);
  });
});

function btn_ir_a(){
  const btn_ir = document.querySelectorAll('[data-nav]');
  btn_ir.forEach((elem)=>{
    elem.addEventListener('click', (e)=>{
      e.preventDefault();
      var data_nav = e.target.getAttribute('data-nav');
      remove_disabled();
      incluir(data_nav);
      if (data_nav == 'productos') {
        nav_links[1].classList.toggle('disabled');
      }
      else{
        nav_links[3].classList.toggle('disabled');
      }
    });
  });
}
btn_ir_a();
  var click = Array.from(nav_links);
  click.push(overlay, btn_menu);
  click.forEach(((e) =>{
    e.addEventListener('click', ()=>{
      header.classList.toggle('open');
    });
  }));
// ------------------------Intersection Observer---------------------
const options = { rootMargin: '0px 300px 350px 300px' };
var images = document.querySelectorAll('[data-src]');
const lazyLoad = (image)=>{
  image.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.src = entry.target.dataset.src;
      obsLoad.unobserve(entry.target);
    }})}
const obsLoad = new IntersectionObserver(lazyLoad, options);
images.forEach((img)=>{
  obsLoad.observe(img);});
  
  
  window.onhashchange = function () {
    window.history.replaceState('', document.title, window.location.pathname + window.location.search)
};


// ---------------------Slider / Carousel-----------------------
function active_slider(){
  const nextSlide = document.getElementById('next');
  const prevSlide = document.getElementById('prev');
  const slides = document.querySelectorAll('.slide');
  const sliderIcons = document.querySelectorAll('.slide_icon');
  const numero_de_slides = slides.length;
  const slider = document.getElementById('slider');
  var slideNumber = 0;
  function nextSlider(){
    slides.forEach((slide)=>{
      slide.classList.remove('active');
    });
    sliderIcons.forEach((slideIcon)=>{
      slideIcon.classList.remove('active');
    })
    slideNumber++;
    if (slideNumber > (numero_de_slides - 1)) {
      slideNumber = 0;
    }
    slides[slideNumber].classList.add('active');
    sliderIcons[slideNumber].classList.add('active');
  }
  nextSlide.addEventListener('click', ()=>{
    console.log('next');
    nextSlider();
  });
  prevSlide.addEventListener('click', ()=>{
    console.log('prev');
    slides.forEach((slide)=>{
      slide.classList.remove('active');
    });
    sliderIcons.forEach((slideIcon)=>{
      slideIcon.classList.remove('active');
    })
    slideNumber--;
    if (slideNumber < 0) {
      slideNumber = numero_de_slides - 1;
    }
    slides[slideNumber].classList.add('active');
    sliderIcons[slideNumber].classList.add('active');
  });
  // Automatic slider
  var playSlider;
  var repeater = ()=>{
    playSlider = setInterval(() => {
      nextSlider();
    }, 2500);
  }
  repeater();
  slider.addEventListener('mouseover', ()=>{
    clearInterval(playSlider);
  })
  slider.addEventListener('mouseout', ()=>{
    repeater();
  })

};
// End Automatic slider

// ------------------------Botones Categorias---------------------
function section_productos(){
  const grid_prod = document.getElementById('grid_prod');
  const btn_categorias = document.querySelectorAll('.cats');
  function hide(number) {
    var productos = document.querySelectorAll('.productos_tarjetas');
    productos.forEach(catt => catt.classList.add('hide'));
    if (number !== 0) {
      document.querySelectorAll(`.categoria_${number}`).forEach((cat)=>{
        cat.classList.remove('hide');
      });
    }
    else{
      productos.forEach(catt => catt.classList.remove('hide'));
    }
  }
  btn_categorias.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      var category = btn.getAttribute('data-cat');
      switch (category) {
        case category = '1':
          hide(category);
          break;

        case category = '2':
          hide(category);
          break;

        case category = '3':
          hide(category);
          break;

        default:
          hide(0);
          break;
      } 
    });
  });
          
  
  // ------------------------Boton Cargar Mas---------------------
  var btn_mas = document.getElementById('btn_mas');
  var produc = document.querySelectorAll('.productos_tarjetas');
  btn_mas.addEventListener('click', (btn)=>{
    for (let i = 0; i < 3; i++) {
      const newNode = produc[i].cloneNode(true);
      grid_prod.appendChild(newNode)
    }
  });
}
// ---------------------------------------------

// ------------------------Comprobar que section esta en Main---------------------
function ejecutar_scripts() {
  var section = document.querySelector('section:first-child');
  var section_class = section.className;
  switch(section_class) {
    case 'hero':
    active_slider();
    btn_ir_a();
      break;
    case 'productos':
    section_productos();
      break;
    case 'contacto':
      console.log('Estas en la seccion Contactos');
      break;
    case 'nosotros':
      console.log('Estas en la seccion Nosotros');
      break;
    default:
      console.log('Error en Mutations');
        break;
  }
}
setTimeout(() => {
  ejecutar_scripts();
}, 300);

// ------------------------Mutacion Observer---------------------
var config = { attributes: true, childList: true, characterData: true };
function mutations(){
  var images = document.querySelectorAll('[data-src]');
  images.forEach((img)=>{
  obsLoad.observe(img);
  });
  ejecutar_scripts();
}
const observer = new MutationObserver(mutations);
observer.observe(main, config);
// --------------------------------