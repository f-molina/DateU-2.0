/*
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
ScrollReveal().reveal('.box1',{delay:500});
ScrollReveal().reveal('.box2',{delay:1000});
ScrollReveal().reveal('.box3',{delay:1500});
*/
function slider1() {
    var x = document.getElementById("bio");
    var y = document.getElementById("gallery");
    if (y.style.display === "none") {
        y.style.display = "block";
        x.style.display = "none";
    }
}

function slider2() {
    var x = document.getElementById("bio");
    var y = document.getElementById("gallery");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
    }
}

function readURL(input,imgPrev) {

    if (input.files && input.files[0]) {
        // console.log(input.files);
        // console.log(input.files[0]);
        
        
        var reader = new FileReader();
        reader.onload = function(e) {
            let im = document.getElementById(imgPrev);
            im.src = e.target.result;
            //$(`#${imgPrev}`).css('background-image', 'url('+e.target.result +')');
      //      $('#imagePreview').hide();
            var elemento = document.getElementById(`${imgPrev}`);
            
            fadeIn(elemento,650);
            //$('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
    // else console.log('no');
    
}

var el = document.getElementById('imageUpload1');
var el2 = document.getElementById('imageUpload2');
var el3 = document.getElementById('imageUpload3');
var el4 = document.getElementById('imageUpload4');
var el5 = document.getElementById('imageUpload5');

// el.addEventListener('click',()=>{
//     readURL(el);    
// });

delegate(document,'change','#imageUpload1',()=>{
    readURL(el,'imagePreview1');    
});
delegate(document,'change','#imageUpload2',()=>{
    readURL(el2,'imagePreview2');    
});
delegate(document,'change','#imageUpload3',()=>{
    readURL(el3,'imagePreview3');    
});
delegate(document,'change','#imageUpload4',()=>{
    readURL(el4,'imagePreview4');    
});
delegate(document,'change','#imageUpload5',()=>{
    readURL(el5,'imagePreview5');    
});

//Stack Overflow solution
function delegate(el, evt, sel, handler) {
    el.addEventListener(evt, function(event) {
        var t = event.target;
        while (t && t !== this) {
            if (t.matches(sel)) {
                handler.call(t, event);
            }
            t = t.parentNode;
        }
    });
}
/*

$("#imageUpload").change(function() {
    console.log(this);
    
    readURL(this);
});*/
function fadeIn(el, time) {
    el.style.opacity = 0;
    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / time;
      last = +new Date();
  
      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };
  
    tick();
  }
  