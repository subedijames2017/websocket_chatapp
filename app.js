const express = require('express');
const path = require('path');
const socket = require('socket.io');
//app set up
var app=express();

//static file
app.use(express.static(path.join(__dirname,'public')));

//listning to the server
var server = app.listen(8888, function(){
    console.log('listening for requests on port 8888,');
});
var io=socket(server);
io.on('connection',(socket)=>{
  console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
