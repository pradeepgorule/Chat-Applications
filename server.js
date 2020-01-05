const io = require('socket.io')(3000)
io.on('connection',socket =>{
const users ={}
//    socket.emit('chat-message','hello-world')
socket.on('new-user',name =>{  //here we getting the message from User
       users[socket.id] = name
    socket.broadcast.emit('new-user',name) //this gone send that message every single person connected to the server
})
    socket.on('send-chat-message',message=>{  //here we getting the message from User
       
        socket.broadcast.emit('chat-message',{messages:message,name:users[socket.id]}) //this gone send that message every single person connected to the server
    })

    socket.on('disconnect', ()=>{  //here we getting the message from User
       
        socket.broadcast.emit('user-disconnect',users[socket.id]) //this gone send that message every single person connected to the server
        delete users[socket.id]
       
    })
})