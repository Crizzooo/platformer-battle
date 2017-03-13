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
let starsArray = []

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
    socket.emit('playerUpdate', players);
  })

  //TODO: emit all the messages in the array
  //TODO: listen for new messages coming in and emit all the messages
  socket.on('newChatMessage', (msgObjFromClient) => {
    //emit message
    io.emit('messagesUpdate', msgObjFromClient);
  })

  socket.on('gameIsStarting', (players) => {
    io.emit('turnOnGameComponent');
    io.emit('startGame', players)
  })

  const throttledStateChange = throttle(emitStateChange, 16);
  socket.on('playerMoving', (playerObj) => {
    // console.log('receive player?', playerObj);
    // console.log('current server players state:', players);
    // console.log('looking for ', playerObj);
    // console.log('in ', players);
    var indexToUpdate = findPlayer(playerObj.socketId);
    // console.log('findPlayer id:', indexToUpdate);

    // console.log('does server make it here')
    var movingPlayer = players[indexToUpdate];
    if (!movingPlayer) {
      return;
    }
    // console.log('WHAT ABOUT HERE');
    movingPlayer.x = playerObj.x;
    movingPlayer.y = playerObj.y;
    movingPlayer.velocityY = playerObj.velocityY;
    movingPlayer.velocityX = playerObj.velocityX;
    movingPlayer.dir = playerObj.dir;
    movingPlayer.socketId = playerObj.socketId;
    movingPlayer.hasMoved = true;
    // console.log('sending updated player:', players[indexToUpdate]);
    // emitStateChange();
    throttledStateChange();
  });

  socket.on('fireIceBall', (x, y, velocity, direction, senderSocketId) => {
    // console.log('server telling clients to create iceball:', x, y, velocity, senderSocketId);
    io.emit('createIceBall', x, y, velocity, direction, senderSocketId);
  });

  socket.on('starsToCreate', (arrStarPositions) => {
    starsArray = arrStarPositions
    console.log('this is our stars array', starsArray)
    // console.log('ARE WE GETTING HERE with the array?', arrStarPositions)
    createStarsAtInterval()
  })

  socket.on('removeCollectedStar', (starId) => {
    //get the collected star and remove it
    console.log('receiving this star', starId)
    io.emit('destroyThisStar', starId)
  })
})



function createStarsAtInterval(){
  // console.log('ARE WE IN THE FUNCTION')
  setInterval(function() {
    // console.log('are we in the set INTERVAL?', starsArray)
    let randNum = Math.floor(Math.random() * starsArray.length)
    var x = starsArray[randNum].x
    var y = starsArray[randNum].y
    // console.log('getting stars info', x, y)
    //trigger a function that will regulary emit out create this star
    io.emit('createThisStar', x, y)
  }, 5000);
}



// function throttledStateChange() {
//   return throttle(emitStateChange, 5);
// }


//create functions for sockets
function findPlayer(socketId){
  return R.findIndex(R.propEq('socketId', socketId))(players);
}

function emitStateChange(){
  // console.log('emitting players:', players);
  io.emit('GameStateChange', players);
}




// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
})
