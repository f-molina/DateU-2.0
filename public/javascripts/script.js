
function slider1() {
    var y = document.getElementById("bio");
    var x = document.getElementById("gallery");
    
    
    if (y.style.display === "none" ) {
        y.style.display = "block";
        x.style.display = "none";
    }
}

function slider2() {
    var y = document.getElementById("bio");
    var x = document.getElementById("gallery");
    
    if (x.style.display === "none" ) {
        x.style.display = "block";
        y.style.display = "none";
    }
}

function readURL(input,imgPrev,oldUrl) {
    
    if (input.files && input.files[0]) {
       
        var img = new Image();

        img.src = window.URL.createObjectURL( input.files[0] );
        img.onload = function() 
        {
            var width = img.naturalWidth,
                height = img.naturalHeight;
                
          console.log ("Image Width: " + width);
          console.log ("Image Height: " +height);
        };
        var reader = new FileReader();

        if(imgPrev === 'profilePreview'){
            reader.onload = function(e) {
                $('#profilePreview').css('background-image', 'url('+e.target.result +')');
                $('#profilePreview').hide();
                $('#profilePreview').fadeIn(650);
                // im.src = e.target.result;
                // link = e.target.result;
                // var elemento = document.getElementById(`${imgPrev}`);
                // console.log(img);
                // fadeIn(elemento,650);

            }
            reader.readAsDataURL(input.files[0]);
            frmData = new FormData();
            frmData.append('file',input.files[0]);
            fetch('/dashboard/profileImage', {
                method: 'PUT',
                body: frmData,
                headers: {
                    enctype:'multipart/form-data'
                }
            }).then(res => {
                
            })

        }
        else{
            reader.onload = function(e) {
                let im = document.getElementById(imgPrev);
                im.src = e.target.result;
                link = e.target.result;
                var elemento = document.getElementById(`${imgPrev}`);
    
                fadeIn(elemento,650);
    
            }
            reader.readAsDataURL(input.files[0]);
            frmData = new FormData();
            frmData.append('file',input.files[0]);
            frmData.append('oldUrl',oldUrl);
            // frmData.append('emailUsr',document.getElementById('email').innerText);
            fetch('/dashboard/images', {
                method: 'PUT',
                body: frmData,
                headers: {
                    enctype:'multipart/form-data'
                }
            }).then(res => {
                
            })
        }
        
    }
    
    

}

$('#profileUpload').change(function(){
    readURL(this,'profilePreview');
});

// var el = document.getElementById('imageUpload1');
// var el2 = document.getElementById('imageUpload2');
// var el3 = document.getElementById('imageUpload3');
// var el4 = document.getElementById('imageUpload4');
// var el5 = document.getElementById('imageUpload5');


// delegate(document,'change','#imageUpload1',()=>{
//     readURL(el,'imagePreview1');    
// });
// delegate(document,'change','#imageUpload2',()=>{
//     readURL(el2,'imagePreview2');    
// });
// delegate(document,'change','#imageUpload3',()=>{
//     readURL(el3,'imagePreview3');    
// });
// delegate(document,'change','#imageUpload4',()=>{
//     readURL(el4,'imagePreview4');    
// });
// delegate(document,'change','#imageUpload5',()=>{
//     readURL(el5,'imagePreview5');    
// });

var elements= document.querySelectorAll('div[class$=gal-item]');

elements.forEach((el)=>{
        var elId= el.firstChild.childNodes[0].firstChild.firstChild.id
        var elementWithId = document.getElementById(elId);
 
    delegate(document,'change','#'+elId,
        ()=>{
            readURL(elementWithId,
                el.firstChild.childNodes[0].childNodes[1].firstChild.firstChild.id,
                el.firstChild.childNodes[0].childNodes[1].firstChild.firstChild.src);    
    });
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