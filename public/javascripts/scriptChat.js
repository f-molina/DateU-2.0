$(function(){
var socket = io();

//buttons and inputs
var message = $("#message")
var username = $("#username")
var send_message = $("#send_message")
var send_username = $("#send_username")
var chatroom = $("#chatroom")
var feedback = $("#feedback")

//Emit message
send_message.click(function(){
  console.log(message.val());
  if(message.val()!=''){
    socket.emit('new_message', {message : message.val()})
  }
})

//Listen on new_message
socket.on("new_message", (data) => {
 feedback.html('');
 message.val('');
 chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
})

//Emit a username
send_username.click(function(){
 socket.emit('change_username', {username : username.val()})
})

//typing
message.bind("keypress", () => {
 socket.emit('typing')
})

//Listen on typing
socket.on('typing', (data) => {
 feedback.html("<p><i>" + data.username + " esta escribiendo un mensaje..." + "</i></p>")
})
});




/*var socket = io();
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
});*/