var submit = document.getElementById('submit');
var email = document.getElementById('email').innerText;

submit.addEventListener('click', ()=>{
    var hobbies = document.getElementById('hobbies').value;
    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value;
    var age = document.getElementById('age').value;
    var description = document.getElementById('description').value;
    var career = document.getElementById('career').value;
    
    let data = {
        name: name,
        lastname: lastname,
        age: age,
        career: career,
        description: description,
        hobbies: hobbies,
        email: email
    }
    console.log(data);

    fetch('/dashboard/updateInfo', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res);
    })
    .then(data => {
        {console.log(data);}
    })
});