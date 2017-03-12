const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const R = require('ramda');
const throttle = require('lodash.throttle');

const server = app.listen(3000, () => {
  console.log('listening on *:3000');
})

const io = require('socket.io')(server);

/* initiate middleware */
(function(){
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  // serve static assets normally
  app.use(express.static(path.resolve(__dirname, '..', 'client')));
}());

//SERVER IN MEMORY STORAGE FOR GAME STATE MANAGEMENT & CHAT
let players = [];
let messages = [];

//Initiate Socket with all functions for server
io.on('connection', (socket) => {
  console.log('a user connected with socketID', socket.id);
  // emit player update to specific socket

  //TODO: Call function that attaches all functions to socket
  socket.on('disconnect', () => {
    console.log('a user has disconnected with socketId:', socket.id);
    //TODO: remove socket from players array
    players = R.filter( (player) => player.socketId !== socket.id, players);
    io.emit('playerUpdate', players);
  })

  socket.on('playerJoined', (playerObj) => {
    //TODO: Customize Player Obj for server purposes
    // Send back new player obj
    playerObj.socketId = socket.id;
    players.push(playerObj);
    //tell client their playerObj
    socket.emit('currentPlayer', playerObj);
    //tell other clients about new player
    io.emit('playerUpdate', players);
  });

  socket.on('playerLeaveGame', () => {
    console.log('a user has left the lobby with socketId:', socket.id);
    //TODO: remove socket from players array
    players = R.filter( (player) => player.socketId !== socket.id, players);
    socket.emit('currentPlayer', {});
    io.emit('playerUpdate', players);
  })

  socket.on('getPlayers', () => {
    console.log('server is sending players:', players);
    socket.emit('playerUpdate', players);
  })

  //TODO: emit all the messages in the array
  //TODO: listen for new messages coming in and emit all the messages
  socket.on('newChatMessage', (msgObjFromClient) => {
    console.log('This message was received from client:', msgObjFromClient.message);
    //emit message
    io.emit('messagesUpdate', msgObjFromClient);
  })

  socket.on('gameIsStarting', (players) => {
    io.emit('turnOnGameComponent');
    io.emit('startGame', players)
  })

  socket.on('playerMoving', (playerObj) => {
    // console.log('current server players state:', players);
    // console.log('looking for ', playerObj);
    var indexToUpdate = findPlayer(playerObj.socketId);
    // console.log('findPlayer id:', indexToUpdate);
    players[indexToUpdate].x = playerObj.x;
    players[indexToUpdate].y = playerObj.y;
    console.log('sending updated player:', players[indexToUpdate]);
    throttledStateChange();
  });
})


var throttledStateChange = throttle(emitStateChange, 35);

//create functions for sockets
function findPlayer(socketId){
  console.log('Searching in:', players, ' for ', socketId);
  return R.findIndex(R.propEq('socketId', socketId))(players);
}

function emitStateChange(){
  io.emit('GameStateChange', players);
}




// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
})
