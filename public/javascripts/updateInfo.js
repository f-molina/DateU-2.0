var submit = document.getElementById('submit');
var email = document.getElementById('email').innerText;
var account = document.getElementById('account');

account.addEventListener('click', ()=>{
    document.getElementById('marital').value = document.getElementById('UserMarital').innerText;
    document.getElementById('age').value = document.getElementById('UserAge').innerText;
    document.getElementById('career').value = document.getElementById('UserCareer').innerText;
    document.getElementById('description').value = document.getElementById('biog').innerText;
    document.getElementById('hobbies').value = document.getElementById('hobs').innerText;
});

submit.addEventListener('click', ()=>{
    var hobbies = document.getElementById('hobbies').value;
    var age = document.getElementById('age').value;
    var description = document.getElementById('description').value;
    var career = document.getElementById('career').value;
    var marital = document.getElementById('marital').value;
    
    let data = {
        age: age,
        career: career,
        marital: marital,
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