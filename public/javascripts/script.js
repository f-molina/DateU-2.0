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
        var reader = new FileReader();
        reader.onload = function(e) {
            let im = document.getElementById(imgPrev);
            im.src = e.target.result;
            var elemento = document.getElementById(`${imgPrev}`);
            
            fadeIn(elemento,650);

            

        }
        reader.readAsDataURL(input.files[0]);
    }

    fetch('/dashboard/users', {
        method: 'GET'
    }).then(res => {return res.json()})
    .then(data => {
        console.log(data);
    })

    let form = document.userForm;
    let nam = document.getElementById('UserName').innerText;
    let data = {
        profileImage: form.imagePreview2.src,
        name: nam
    };
    fetch('/dashboard/images', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log('res ok');
        return res.json();
    })
    .then(data => {
        if(data.ok){
            console.log('Data ok');
            console.log(data);
            let per = document.getElementsByName('profileImage');
            per.src = form.imagePreview2.src;
        }
    })

}

var el = document.getElementById('imageUpload1');
var el2 = document.getElementById('imageUpload2');
var el3 = document.getElementById('imageUpload3');
var el4 = document.getElementById('imageUpload4');
var el5 = document.getElementById('imageUpload5');


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
  