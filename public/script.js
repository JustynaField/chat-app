const socket = io();

$('form').submit(function(e){
  e.preventDefault();
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('user', function(msg) {
  $('#messages').append($('<li>').text(msg));
})

socket.on('chat message', function(msg){
  $('#m').prop('placeholder', '')
  $('#messages').append($('<li>').text(msg));
});

socket.on('message', (message) => {
  $('#messages').append($('<li>').text(message))
})

$('#m').on('keyup', () => {
  socket.emit('type now', 'is typing.')
})

socket.on('type now', (message) => {
  $('#m').prop('placeholder', message)
})
