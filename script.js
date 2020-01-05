const socket = io('http://localhost:3000')
const messageContainer = document.getElementById("message-container")
const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")

const name = prompt('what is your name ?')
appendMessage("You joined")
socket.emit('new-user',name)

socket.on('chat-message',data=>{
    appendMessage(`${data.name}:${data.messages}`)  // call that i.e. appendMessage function to send data to the other User and display who send the message  i.e display name and message
})
socket.on('new-user',name =>{
    
    appendMessage(name+" joined ")  // call that function to send data to the other User and display
})

socket.on('user-disconnect',name =>{
    
    appendMessage(`${name} disconnected`)  // call that function to send data to the other User and display
})

messageForm.addEventListener("submit",e=>{
    e.preventDefault();
    
    const message = messageInput.value
    appendMessage(`You:${message}`)
    socket.emit('send-chat-message',message) //emit will send message to client to the server
    messageInput.value = ""  // this will clear textbox after click on submit
})

function appendMessage(message){
    const messageElement = document.createElement('div')
 
    messageElement.innerHTML = message
    messageContainer.append(messageElement)
}