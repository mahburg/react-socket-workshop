const express = require('express')
    , http = require('http')
    , socket_io = require('socket.io')

//----------Setup-----------
const PORT = 8000
    , app = express()
    , server = http.createServer(app)
    , io = socket_io(server)

let connections = []
let users = []
let messages = []

io.on('connection', function(socket){
    connections.push(socket);
    console.log(`${socket.id} connected: ${connections.length} active connections.`)

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket),1);
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == socket.id){
                users.splice(i, 1);
                break;
            }
        }
        console.log(`Connection disconnected: ${connections.length} active connections.`)
        io.sockets.emit('update users', {users: users});
        if (!connections.length){
            messages=[];
        }          
    })

    socket.on('send message', function(data) {
        let ts = new Date()
        data.timestamp = `${ts.getHours()}:${ts.getMinutes()}`;
        messages.push(data)
        io.sockets.emit('message', messages)
    })
    socket.on('login', function (data) {
        users.push({
            name: data,
            id: socket.id
        })
        socket.emit('logged in', {loggedIn: true, currentUser: data, history: messages})
        io.sockets.emit('update users', {users: users})
        socket.emit('update users', {users: users})
    })
})

server.listen(PORT, console.log(`Listening on port→ ${PORT}`))