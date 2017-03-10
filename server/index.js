const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const R = require('ramda');

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

//SERVER IN MEMORY STORAGE FOR GAME STATE MANAGEMENT
let players = [];


//Initiate Socket with all functions for server
io.on('connection', (socket) => {
  console.log('a user connected with socketID', socket.id);
  // emit player update to specific socket
  socket.emit('playerUpdate', players);

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
})


//gamestate routes
//TODO: replace route with 'loadPlayers'
app.get('/players', (req, res, next) => {
  console.log('hit api players route with players obj', players);
  res.status(201).send(players);
});


//TODO: replace route with on 'createPlayer'
app.post('/player', (req, res, next) => {
  players.push(req.body)
  io.emit('players Update', players)
  res.status(200).send();
});


//create functions for sockets






// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
})
