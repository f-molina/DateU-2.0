var socket = io();
      function sendMessage(){
        console.log('Entrando a sendMessage');
        let message = document.getElementsByClassName("messageContent");
        socket.emit('chat message', message[0].value);
        message[0].value = "";
      }
      socket.on('chat message', function(message){
        console.log('Entrando a chat message');
        console.log('Entrando a newMessage');
        let ul = document.getElementsByClassName("messageList");
        if (message == "" || message == undefined) { return false; }
        let li = document.createElement("li");
        li.className = "sent";
        li.innerHTML = `<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>`+ message + `</p>`;
        ul[0].appendChild(li);
        console.log('Saliendo newMessage');
      });