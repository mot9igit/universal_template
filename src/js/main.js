document.addEventListener('DOMContentLoaded', function(){
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

})