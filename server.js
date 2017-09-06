const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'))

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

const user = {
  name: "James"
}

io.on('connection', (socket) => {

  io.emit('message', `${user.name} has just connected.`)

  socket.on('disconnect', () => {
    io.emit('message', `${user.name} has disconnected`);
  });
});

io.on('connection', (socket) => {

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg)
  });
});

io.on('connection', (socket) => {

  socket.on('type now', function(message) {

    socket.broadcast.emit('type now', `${user.name} ${message}`)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000');
});
