const http = require('http');
const path = require('path');
const express = require('express');
const socket_io = require('socket.io');

const {generate_message, generate_location_message} = require('./utils/message');

const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socket_io(server);

app.use(express.static(public_path));

io.on('connection', (socket) =>{
    console.log('new user connected');
    socket.emit('new_message', generate_message('admin', 'welcome to chat app'));
    
    socket.broadcast.emit('new_message',generate_message('admin', 'new user joined'));
    
    socket.on('create_message', (new_message, callback) =>{
        console.log(new_message);
        io.emit('new_message',generate_message(new_message.from, new_message.text));
        callback({
            data: 'from server'
        });
    });
    
    socket.on('create_location_message', (coords) =>{
        socket.broadcast.emit('new_location_message', generate_location_message('admin', coords.latitude, coords.longitude))
    });
    
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});
