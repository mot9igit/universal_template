const dartModal = {
  options: {
    trigger: "[data-dart-modal]",
    target: "dartTarget",
    activeClass: "show",
    modals: ".dart-modal",
    overlay: ".dart-modal-overlay",
    close: ".dart-modal-close",
    scrollPosition: 0
  },
  initialize: function(){
    const dartModals = document.querySelectorAll(this.options.trigger);
    // open
    for(let i = 0; i < dartModals.length; i++){
      dartModals[i].addEventListener('click', (e) => {
        e.preventDefault()
        dartModal.closeAll()
        let parent = e.target
        if(!e.target.dataset[dartModal.options.target]){
          parent = dartModal.closest(e.target, dartModal.options.trigger)
        }
        const target = parent.dataset[dartModal.options.target]
        const targetModal = document.querySelector(".dart-modal#" + target)
        if (targetModal !== null) {
          dartModal.modalOpen(targetModal)
        }else{
          dartModal.log("Модальное окно с ID " + target + " не найдено!")
        }
      })
    }
    // overlay click
    const dartOverlays = document.querySelectorAll(this.options.overlay);
    // close
    for(let i = 0; i < dartOverlays.length; i++){
      dartOverlays[i].addEventListener('click', (e) => {
        e.preventDefault()
        const parentModal = dartModal.closest(e.target, dartModal.options.modals)
        if(parentModal){
          dartModal.modalClose(parentModal)
        }
      })
    }
    // overlay click
    const dartCloses = document.querySelectorAll(this.options.close);
    // close
    for(let i = 0; i < dartCloses.length; i++){
      dartCloses[i].addEventListener('click', (e) => {
        e.preventDefault()
        const parentModal = dartModal.closest(e.target, dartModal.options.modals)
        if(parentModal){
          dartModal.modalClose(parentModal)
        }
      })
    }
  },
  closest: function (el, cls) {
    while ((el = el.parentElement) && !el.matches(cls));
    return el;
  },
  modalOpen: function(object){
    object.classList.add(dartModal.options.activeClass)
    this.fixBody()
  },
  modalClose: function(object){
    object.classList.remove(dartModal.options.activeClass)
    const dartModals = document.querySelectorAll(this.options.modals + '.' + this.options.activeClass);
    if(!dartModals.length){
      dartModal.unfixBody()
    }
  },
  closeAll: function(){
    const dartModals = document.querySelectorAll(this.options.modals);
    for(let i = 0; i < dartModals.length; i++){
      dartModals[i].classList.remove(dartModal.options.activeClass)
    }
  },
  fixBody: function(){
    let html = document.documentElement;
    dartModal.options.scrollPosition = window.pageYOffset;
    html.style.top = -dartModal.options.scrollPosition + "px";
    html.classList.add("dart-modal-active");
    let marginSize = window.innerWidth - html.clientWidth;
    if (marginSize) {
        html.style.marginRight = marginSize + "px";
    }
  },
  unfixBody: function(){
    let html = document.documentElement;
    html.classList.remove("dart-modal-active");
    window.scrollTo(0, dartModal.options.scrollPosition);
    html.style.top = "";
    html.style.marginRight = "";
  },
  log: function(text){
    console.log("DART MODAL: " + text)
  }
}

document.addEventListener('DOMContentLoaded', function(){
  // Модальные окна
  dartModal.initialize()

  const radios = document.querySelectorAll(".form_radio input[name='radio-lead']")
  for(let i = 0; i < radios.length; i++){
    radios[i].addEventListener('change', (e) => {
      const wrap = document.querySelector(".lead-view-block")
      wrap.style.display = "block"
      const elems = document.querySelectorAll(".lead-view")
      for(let i = 0; i < elems.length; i++){
        elems[i].style.display = "none"
      }
      const elem = document.querySelector(".lead-view-" + e.target.value)
      elem.style.display = "block"
    })
  }

  $(".catalog_menu:not(.main) > a").click(function(e) {
    e.preventDefault();
    $(this).closest('.catalog_menu').toggleClass('active');
    $(this).closest('.catalog_menu').find('.icon').toggleClass('active');
  });
  $(".sort-toggler").click(function(e) {
    e.preventDefault();
    $(this).parent().toggleClass("active");
  });
  $(document).mouseup(function(e) {
    var div = $(".sorting_box_inner");
    if (!div.is(e.target) && div.has(e.target).length === 0 && div.hasClass("active")) {
        div.toggleClass("active");
    }
  });
  $(".filter-toggler").click(function(e) {
    e.preventDefault();
    var overlay = $(".overlays");
    $(this).toggleClass("noactive");
    $('.widget.filters').toggleClass("active");
    if ($('body').hasClass("noscroll")) {
        $('body').removeClass("noscroll");
    } else {
        $('body').addClass("noscroll");
    }
    overlay.toggleClass("active");
  });
  $(".filter-close").click(function(e) {
    e.preventDefault();
    $(".filter-toggler").toggleClass("noactive");
    $('.widget.filters').toggleClass("active");
    $('.overlays').toggleClass("active");
    if ($('body').hasClass("noscroll")) {
        $('body').removeClass("noscroll");
    } else {
        $('body').addClass("noscroll");
    }
  });
  //Открытие менюшки

  const menu_toggler = document.querySelector('.nav-dart-menu');
  const mobile_menu = document.querySelector('.mobile-menu');
  const body = document.querySelector('body');

  if(menu_toggler && mobile_menu){
    menu_toggler.addEventListener('click', () => {
      mobile_menu.classList.toggle('show');
      body.style.overflow = "hidden"      
    })
  }

  //Закрытие менюшки
  if(mobile_menu){
    mobile_menu.addEventListener('click', (e) => {
      if (!document.querySelector('.mobile-menu__container').contains(e.target)){
        mobile_menu.classList.remove('show');
        body.style.overflow = "auto"
      }
    })      
  }

  //Модальное окно каталога
  const showModalCatalog = document.querySelectorAll('.mobile-catalog-trigger');
  const CatalogModal = document.querySelector('.mobile-catalog');
  let isModalCatalog = false;

  if(showModalCatalog && CatalogModal){
    for(let i = 0; i < showModalCatalog.length; i++){
      showModalCatalog[i].addEventListener('click', () => {
        if(isModalCatalog){
          CatalogModal.classList.remove('show')
          var mobile_menu_active = document.querySelector('.mobile-menu.show');
          if(!mobile_menu_active){
            body.style.overflow = "auto"
          }
          isModalCatalog = false
        }else{
          CatalogModal.classList.add('show');
          body.style.overflow = "hidden"
          isModalCatalog = true
        }	
      })
    }
  }

  //Левое меню каталог
  const menu_items = document.querySelectorAll('.dart-catalog-menu__el.link-no-link');
  if(menu_items){
      for (let i = 0; i < menu_items.length; i++) {
          menu_items[i].addEventListener("click", function(e) {
            e.preventDefault();
            menu_items[i].parentElement.classList.toggle("active");
            const el = menu_items[i].parentElement.querySelector('.dart-catalog-menu__list');

            if (el.style.maxHeight) {
              el.style.maxHeight = null;
            } else {
              el.style.maxHeight =  el.scrollHeight + "px";
            }
          });
      }
  }

  //Закрытие каталога
  if(CatalogModal){
    CatalogModal.addEventListener('click', (e) => {
      if (!document.querySelector('.mobile-catalog__content').contains(e.target)){
        CatalogModal.classList.remove('show');
        var mobile_menu_active = document.querySelector('.mobile-menu.show');
        if(!mobile_menu_active){
          body.style.overflow = "auto"
        }
        isModalCatalog = false
      }
    })      
  }

  // swiper gallery
  const swiper_thumbnail = new Swiper(".swiper_thumbnail", {
    slidesPerView: 4,
    spaceBetween: 15,                                  
  }) 
  const swiper = new Swiper('.swiper_gallery', {
    loop: true,         
    spaceBetween: 15,                
    autoplay: {                         
        delay: 2000,  
    },                   
    navigation: {                       
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {                       //added
      swiper: swiper_thumbnail,   //added
    }
  })
})