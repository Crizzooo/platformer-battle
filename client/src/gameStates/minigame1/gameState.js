let currentPlayer;

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
const update = () => {
  currentPlayer.body.velocity.x = 0;
  if(PB.game.cursors.left.isDown){
    currentPlayer.body.velocity.x = -PB.customParams.RUNNING_SPEED;
    currentPlayer.scale.setTo(1, 1);
    currentPlayer.play('walking');
  } else if(PB.game.cursors.right.isDown){
    currentPlayer.body.velocity.x = PB.customParams.RUNNING_SPEED;
    currentPlayer.scale.setTo(-1, 1);
    currentPlayer.play('walking');
  }
  else {
    currentPlayer.animations.stop();
    currentPlayer.frame = 3;
  }

  if (PB.game.cursors.up.isDown){
    currentPlayer.body.velocity.y = -PB.customParams.JUMPING_SPEED;
    currentPlayer.scale.setTo(1, -1);
    currentPlayer.play('walking');
  }
}


const MiniGameOneState = {
  init,
  preload,
  create,
  update
};

export default MiniGameOneState;

const playerData = [{x: 30, y: 30}, {x: 50, y: 50}, {x: 80, y: 80}, {x: 110, y: 110}];

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

        // playerToAdd.body.gravity.y =

        if (playerObj.socketId === socket.id){
          console.log('My current Player is: ', playerObj);
          currentPlayer = playerToAdd;
          //the cursor keys will only move currentPlayer
          PB.game.camera.follow(currentPlayer);
        }

        //all players get a physics body
        playerToAdd.anchor.setTo(0.5);
        playerToAdd.scale.setTo(3);
        playerToAdd.animations.add('walking', [0, 1, 2, 1], 6, true);
        playerToAdd.body.collideWorldBounds = true;
      });
  console.log('Group of players = ', PB.game.playersGroup);
};
