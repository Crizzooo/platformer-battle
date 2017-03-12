const R = require('ramda');
let currentPlayer;
let remotePlayers = [];


const updatePlayers = (arrPlayerData) => {
  console.log('updating players');
  let playersToUpdate = arrPlayerData;
  if (currentPlayer) {
    playersToUpdate = arrPlayerData.filter( (player) => player.socketId !== currentPlayer.socketId);
  }
  playersToUpdate.forEach( (player) => {
    let movingPlayerSprite = findPlayer(player.socketId);
    console.log("received state:", player);
    console.log('moving Player old state:', movingPlayerSprite);
    movingPlayerSprite.x = player.x;
    movingPlayerSprite.y = player.y;
    // movingPlayerSprite.velocityX = player.velocityX;
    // movingPlayerSprite.velocityY = player.velocityY;
    movingPlayerSprite.dir = player.dir;
  })
};
// socket.on('playerMovement', (playerObjects) => {
//   console.log('client 2 received:', playerObjects);
// });
const GRAVITY = 1000;

const init = (msg) => {
  console.log('PB Custom Params:', PB.customParams);
  PB.customParams.msg = msg;

  //set constants for game
  PB.customParams.RUNNING_SPEED = 180;
  PB.customParams.JUMPING_SPEED = 100;

  //initiate physics
  PB.game.physics.arcade.gravity.y = GRAVITY;

  //cursor keys
  // PB.game.cursors = PB.game.input.keyboard.createCursorKeys();
  socket.emit('newChatMessage', {message: PB.customParams.msg, name: 'PHASER GAME'});
  socket.on('GameStateChange', updatePlayers);
  console.log('socket should be listening....');
}

const preload = () => {
  //load assets that are specific for this mini game
}

const create = () => {
  //create game set up
  loadLevel();
}

var isMoving = false;
var isJumping = false;
const update = () => {
  PB.game.physics.arcade.collide(PB.game.playersGroup);
  PB.game.physics.arcade.collide(PB.game.playersGroup, PB.game.platform1);
  PB.game.physics.arcade.collide(PB.game.playersGroup, PB.game.platform2);

  if (currentPlayer != null && currentPlayer.alive == true){
    console.log('Player is alive');

    //player moving left
    if (PB.game.cursors.left.isDown){
      var isMoving = true;
      currentPlayer.body.velocity.x = -PB.customParams.RUNNING_SPEED;
      currentPlayer.dir = "left";
      //player moving right
    } else if (PB.game.cursors.right.isDown){
      var isMoving = true;
      currentPlayer.body.velocity.x = PB.customParams.RUNNING_SPEED;
      currentPlayer.dir = "right";
    } else {
      //player not moving sideways
      //if they are touching ground, they are also not jumping
      currentPlayer.body.velocity.x = 0;
      currentPlayer.animations.stop();
      currentPlayer.frame = 3;
      currentPlayer.dir = "front";
    }
    //start a jump if touching ground
    if (isJumping && currentPlayer.body.touching.down) {
      isJumping = false;
    }
    if (PB.game.cursors.up.isDown && (currentPlayer.body.blocked.down || currentPlayer.body.touching.down)){
        isMoving = true;
        isJumping = true;
        currentPlayer.body.velocity.y = -500;
    }
    //if they were jumping and dont touch ground, they are moving
    if (isJumping && !currentPlayer.body.touching.down){
      isMoving = true;
    }
    //if they are not jumping or moving, stop the player
    if (!isJumping && !isMoving){
        freeze(currentPlayer);
    } else if(isMoving) {
      //if they are moving (by jumping or sideways, broadcast update
      currentPlayer.play('walking');
      console.log('emit position and direction!');
      socket.emit('playerMoving', {
        x: currentPlayer.x,
        y: currentPlayer.y,
        velocityY: currentPlayer.body.velocity.y,
        velocityX: currentPlayer.body.velocity.x,
        dir: currentPlayer.dir,
        socketId: currentPlayer.socketId
      })
    }
    console.log('currentPlayer', currentPlayer);
    console.log('player moving:', isMoving);
    console.log('player jumping:', isJumping);
  }
}

function findPlayer(socketId){
  return R.find(R.propEq('socketId', socketId))(PB.game.playersGroup.children);
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
  //load map
  // PB.game.map = PB.game.add.tilemap('level1');

  //create layers
  // PB.game.backgroundLayer = PB.game.map.createLayer('backgroundLayer');
  // PB.game.collisionLayer = PB.game.map.createLayer('collisionLayer');

  //send background to the back
  // PB.game.world.sendToBack(PB.game.backgroundLayer);

  //collision layer should be collisionLayer
  // PB.game.map.setCollisionBetween(1, 160, true, 'collisionLayer');

  //resize the world to fit the layer
  // PB.game.collisionLayer.resizeWorld();

  PB.game.platform1 = PB.game.add.sprite(0, 300, 'platform');
  PB.game.physics.arcade.enable(PB.game.platform1);
  PB.game.platform1.body.allowGravity = false;
  PB.game.platform1.body.immovable = true;
  PB.game.platform2 = PB.game.add.sprite(100, 500, 'platform');
  PB.game.physics.arcade.enable(PB.game.platform2);
  PB.game.platform2.body.allowGravity = false;
  PB.game.platform2.body.immovable = true;



  //load players & remote players
  PB.game.playersGroup = PB.game.add.group();
  PB.game.playersGroup.enableBody = true;
      //for each player in players
      PB.customParams.players.forEach( (playerObj, index) => {
        //TODO: Change sprite on each iteration to be a color]
        console.log('Creating Player: ', playerObj);
        const playerToAdd = PB.game.playersGroup.create(playerData[index].x, playerData[index].y, 'player');
        playerToAdd.socketId = playerObj.socketId;

        //all players get a physics body
        playerToAdd.anchor.setTo(0.5);
        playerToAdd.scale.setTo(1);
        playerToAdd.animations.add('walking', [0, 1, 2, 1], 6, true);
        playerToAdd.body.collideWorldBounds = true;
        playerToAdd.body.allowGravity = true;


        //Add Properties to PB.customParams.players
        playerObj.x = playerToAdd.x;
        playerObj.y = playerToAdd.y;
        playerToAdd.name = playerObj.name;

        if (playerObj.socketId === socket.id){
          console.log('My current Player is: ', playerObj);
          currentPlayer = playerToAdd;
          PB.game.camera.follow(currentPlayer);
        } else {
          console.log('Pushiong remote player: ', playerToAdd);
          remotePlayers.push(playerToAdd);
        }

      });
  console.log('Group of players = ', PB.game.playersGroup);
  console.log('After load this is our Remote Players', remotePlayers);
};


const freeze = (playerSprite) => {
  playerSprite.animations.stop();
  playerSprite.body.velocity.x = 0;
}
