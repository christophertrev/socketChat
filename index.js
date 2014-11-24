var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.set('port', (process.env.PORT || 5000))

io.set('transports','xhr-polling');


io.on('connection', function(socket){
  var username = socket.handshake.query.user;
  console.log('User ' + username + ' connected!' );
  socket.broadcast.emit('chat message',{
    text : 'User '+ username+' Connected',
    username: 'The Admins'
  });
  socket.on('chat message',function(msg){
    console.log('mesage: ', msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    var username = socket.handshake.query.user;
    console.log('User '+ username +' disconnected!');
    socket.broadcast.emit('chat message',{
      text : 'User '+ username+' disconnected',
      username: 'The Admins'
    });
  });
});



http.listen(app.get('port'), function(){
  console.log('listening on *:3000');
});