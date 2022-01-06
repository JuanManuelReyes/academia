// Banner Carrusel
$("#homeImg").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });    

  //Instructores Carrusel
  $("#autos").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 3,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  });    