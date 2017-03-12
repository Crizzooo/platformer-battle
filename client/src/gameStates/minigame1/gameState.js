let customParams = {};

let player;

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
}

const preload = () => {
  //load assets that are specific for this mini game
}

const create = () => {
  //create game set up
  socket.emit('newChatMessage', {message: PB.customParams.msg, name: 'PHASER GAME'});
  loadLevel();
}
const update = () => {
  player.body.velocity.x = 0;
  if(PB.game.cursors.left.isDown){
    player.body.velocity.x = -customParams.RUNNING_SPEED;
    player.scale.setTo(1, 1);
    player.play('walking');
  } else if(PB.game.cursors.right.isDown){
    player.body.velocity.x = customParams.RUNNING_SPEED;
    player.scale.setTo(-1, 1);
    player.play('walking');
  }
  else {
    player.animations.stop();
    player.frame = 3;
  }

  if (PB.game.cursors.up.isDown){
    player.body.velocity.y = -customParams.JUMPING_SPEED;
    player.scale.setTo(1, -1);
    player.play('walking');
  }
}


const MiniGameOneState = {
  init,
  preload,
  create,
  update
};

export default MiniGameOneState;

const loadLevel = () => {
  console.log()
  //need a player group

      //for each player in players

          //if player is the current player
                //they get the cursor keys

        //all players get a physics body


  player = PB.game.add.sprite(PB.game.world.centerX, PB.game.world.centerY, 'player', 3);
  player.anchor.setTo(0.5);
  player.scale.setTo(3);
  player.animations.add('walking', [0, 1, 2, 1], 6, true);
  PB.game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  PB.game.camera.follow(player);
};
