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
})