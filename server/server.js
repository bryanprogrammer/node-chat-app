/*import path for easy paths*/
const http = require('http');
const path = require('path');
const express = require('express');
const socket_io = require('socket.io');

const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socket_io(server);

app.use(express.static(public_path));

io.on('connection', (socket) =>{
    console.log('new user connected');
    
    socket.emit('new_email', {
        from: 'nryan@gmail.com',
        name: 'Bryan',
        text: "hey what is going on",
        created_at: 123
    });
    socket.on('create_message', (new_message) =>{
        console.log(new_message);
    });
    
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});
