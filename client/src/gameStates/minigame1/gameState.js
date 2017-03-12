const R = require('ramda');
let currentPlayer;

// socket.on('playerMovement', (playerObjects) => {
//   console.log('client 2 received:', playerObjects);
// });

const init = (msg) => {
  console.log('PB Custom Params:', PB.customParams);
  PB.customParams.msg = msg;

  //set constants for game
  PB.customParams.RUNNING_SPEED = 180;
  PB.customParams.JUMPING_SPEED = 100;

  //initiate physics
  PB.game.physics.arcade.gravity.y = 1000;

  //cursor keys
  // PB.game.cursors = PB.game.input.keyboard.createCursorKeys();
  socket.emit('newChatMessage', {message: PB.customParams.msg, name: 'PHASER GAME'});
}

const preload = () => {
  //load assets that are specific for this mini game
}

const create = () => {
  //create game set up
  loadLevel();
}

var isMoving;
const update = () => {
  PB.game.physics.arcade.collide(PB.game.playersGroup);
  currentPlayer.body.velocity.x = 0;
  if(PB.game.cursors.left.isDown){
    isMoving = true;
    currentPlayer.body.velocity.x = -PB.customParams.RUNNING_SPEED;
    currentPlayer.scale.setTo(1, 1);
    currentPlayer.play('walking');
  } else if(PB.game.cursors.right.isDown){
    isMoving = true;
    currentPlayer.body.velocity.x = PB.customParams.RUNNING_SPEED;
    currentPlayer.scale.setTo(-1, 1);
    currentPlayer.play('walking');
  }
  else {
    isMoving = false;
    currentPlayer.animations.stop();
    currentPlayer.frame = 3;
  }

  if (PB.game.cursors.up.isDown){
    isMoving = true;
    currentPlayer.body.velocity.y = -PB.customParams.JUMPING_SPEED;
    currentPlayer.scale.setTo(1, -1);
    currentPlayer.play('walking');
  }

  if (isMoving) {
    console.log(currentPlayer);
    // socket.emit('playerMoving', {socketId: socket.id, x: currentPlayer.x, y: currentPlayer.y});
  }

  console.log('Player State in Phaser:', PB.customParams.players);
  PB.customParams.players.forEach( (player) => {
    console.log('looping over this guy:', player);
    var playerIndexToUpdate = findPlayer(player.socketId);
    PB.game.playersGroup.children[playerIndexToUpdate].x = player.x;
    PB.game.playersGroup.children[playerIndexToUpdate].y = player.y;
  })
  socket.emit('playerMoving', {socketId: socket.id, x: currentPlayer.x, y: currentPlayer.y, xVelocity: currentPlayer.body.velocity.x, yVelocity: currentPlayer.body.velocity.y});
}

function findPlayer(socketId){
  console.log('Searching in:', PB.game.playersGroup, ' for ', socketId);
  return R.findIndex(R.propEq('socketId', socketId))(PB.game.playersGroup.children);
}

const MiniGameOneState = {
  init,
  preload,
  create,
  update
};

export default MiniGameOneState;

const playerData = [{x: 100, y: 300}, {x: 100, y: 30}, {x: 500, y: 300}, {x: 500, y: 30}];

const loadLevel = () => {
  //need a player group
  PB.game.playersGroup = PB.game.add.group();
  PB.game.playersGroup.enableBody = true;
      //for each player in players
      PB.customParams.players.forEach( (playerObj, index) => {
        //if player is the current player
        //TODO: Change sprite on each iteration to be a color]
        console.log('Creating Player: ', playerObj);
        const playerToAdd = PB.game.playersGroup.create(playerData[index].x, playerData[index].y, 'player');
        playerToAdd.socketId = playerObj.socketId;
        // playerToAdd.body.gravity.y =

        if (playerObj.socketId === socket.id){
          console.log('My current Player is: ', playerObj);
          currentPlayer = playerToAdd;
          //the cursor keys will only move currentPlayer
          PB.game.camera.follow(currentPlayer);
        }

        //all players get a physics body
        playerToAdd.anchor.setTo(0.5);
        playerToAdd.scale.setTo(1);
        playerToAdd.animations.add('walking', [0, 1, 2, 1], 6, true);
        playerToAdd.body.collideWorldBounds = true;


        //Add Properties to PB.customParams.players
        playerObj.x = playerToAdd.x;
        playerObj.y = playerToAdd.y;
      });
  console.log('Group of players = ', PB.game.playersGroup);
  console.log('After load this is our PB.cp.players', PB.customParams.players);
};
