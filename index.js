var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.set('port', (process.env.PORT || 5000))

io.on('connection', function(socket){

  console.log('a user connected');
  
  io.emit('Hello Welcome to Chatbox!`');
  
  socket.on('chat message',function(msg){
    console.log('mesage: ', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});