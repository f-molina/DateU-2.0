// activar carousel
$("#myCarousel").carousel();

// indicadores del carousel
$(".item").click(function(){
    $("#myCarousel").carousel(1);
});

// controles del carousel (flechas)
$(".carousel-control-prev").click(function(){
    $("#myCarousel").carousel("prev");
});

$(".carousel-control-next").click(function(){
    $("#myCarousel").carousel("next");
});

//scrollReveal

ScrollReveal().reveal('.heading1',{delay:500});
ScrollReveal().reveal('.p1',{delay:800});
ScrollReveal().reveal('.c1',{delay:500});
ScrollReveal().reveal('.c2',{delay:1000});
ScrollReveal().reveal('.c3',{delay:1500});