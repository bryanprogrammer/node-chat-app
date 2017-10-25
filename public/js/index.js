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
socket.on('new_location_message', function(message){
   var li = $('<li></li>');
   var a = $('<a target="_blank"> my current location</a>');
   
   li.text(`${message.from}: `);
   a.attr('href', message.url);
   li.append(a);
   
   $('#messages').append(li);
});


$('#message-form').on('submit', function(e){
   e.preventDefault();
    socket.emit('create_message',{
        from: 'User',
        text: $('[name=message]').val()
    }, function(data){
        console.log(data);
    });
});

var location_btn = $("#send-location");


location_btn.on('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('create_location_message',{
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
        console.log(position);
    }, function(){
        return alert('Unable to fetch location');
    });
});