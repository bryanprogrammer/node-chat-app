const http = require('http');
const path = require('path');
const express = require('express');
const socket_io = require('socket.io');

const {generate_message} = require('./utils/message');

const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socket_io(server);

app.use(express.static(public_path));

io.on('connection', (socket) =>{
    console.log('new user connected');
    socket.emit('notification', generate_message('admin', 'welcome to chat app'));
    
    socket.broadcast.emit('notification',generate_message('admin', 'new user joined'));
    
    socket.on('create_message', (new_message) =>{
        console.log(new_message);
        io.emit('new_message',generate_message(new_message.from, new_message.text));
        /*socket.broadcast.emit('new_message',{
            from: new_message.from,
            text: new_message.text,
            created_at:new Date().getTime()
        });*/
    });
    
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});
