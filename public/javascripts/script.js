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