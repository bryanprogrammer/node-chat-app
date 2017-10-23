var socket = io();

socket.on('connect', function(){
    console.log('connected to server');
    
    socket.emit('create_message',{
        to:"nama@gmail.com",
        text:"THis is bryan"
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('new_message', function (data) {
    console.log(data);
});