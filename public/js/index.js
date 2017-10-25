var socket = io();

socket.on('connect', function(){
    console.log('connected to server');
    
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('new_message', function (data) {
    var li = $('<li></li>');
    li.text(data.from + " : " + data.text);
    
    $('#messages').append(li);
});

/*socket.emit('create_message',{
   from: 'namasake',
   text: 'hi'
}, function(data){
    console.log(data);
});*/

$('#message-form').on('submit', function(e){
   e.preventDefault();
    socket.emit('create_message',{
        from: 'User',
        text: $('[name=message]').val()
    }, function(data){
        console.log(data);
    });
});