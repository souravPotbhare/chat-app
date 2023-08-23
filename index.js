const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('user joined', (userName) => {
    socket.userName = userName;
    io.emit('user joined', userName);
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', {
      sender: socket.userName,
      message: message,
    });
  });
  // ... rest of the code ...
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is listening on *:3000');
});
