// Create a new Express app
const express = require('express');
const app = express();

// Create a new Socket.io server
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

// Create a list to store connected users
const users = [];

// Listen for new connections
io.on('connection', (socket) => {
  // Add the new user to the list
  users.push(socket);

  // Listen for messages from the user
  socket.on('message', (message) => {
    // Broadcast the message to all connected users
    io.emit('message', message);
  });

  // Listen for the user disconnecting
  socket.on('disconnect', () => {
    // Remove the user from the list
    users.splice(users.indexOf(socket), 1);
  });
});

// Start the server
server.listen(3001, () => {
  console.log('Server listening on port 3001');
});
