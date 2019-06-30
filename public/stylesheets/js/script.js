window.onload=function(){
  $('.slider').slick({
  autoplay:true,
  autoplaySpeed:1500,
  arrows:true,
  prevArrow:'<button type="button" class="slick-prev"></button>',
  nextArrow:'<button type="button" class="slick-next"></button>',
  centerMode:true,
  slidesToShow:6,
  slidesToScroll:1
  });

// Initialize library
lozad('.lozad', {
  load: function(el) {
      el.src = el.dataset.src;
  }
}).observe()
};

