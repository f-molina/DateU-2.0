var submit = document.getElementById('submit');
var email = document.getElementById('email').innerText;
var account = document.getElementById('account');

account.addEventListener('click', ()=>{
    document.getElementById('name').value = document.getElementById('UserName').innerText;
    document.getElementById('lastname').value = document.getElementById('UserLastName').innerText;
    document.getElementById('age').value = document.getElementById('UserAge').innerText;
    document.getElementById('career').value = document.getElementById('UserCareer').innerText;
    document.getElementById('description').value = document.getElementById('bio').innerText;
    document.getElementById('hobbies').value = document.getElementById('hobs').innerText;
});

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