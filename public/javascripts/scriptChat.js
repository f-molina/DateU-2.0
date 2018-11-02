function newMessage(){
    let ul = document.getElementsByClassName("messageList");
    let message = document.getElementsByClassName("messageContent");

    if(message[0].value=="" || message[0].value==undefined){return false;}

    let li = document.createElement("li");
    li.className = "sent";
    li.innerHTML = `
        <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
        <p>`+message[0].value+`</p>`;
    ul[0].appendChild(li);
    message[0].value="";
}