



const init = (players) => {
  console.log('init function ran with:', players)
  PB.game.stage.backgroundColor = '#da2dc3';
  PB.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  //TODO: WHAT DOES THIS SHIT DO?
  // PB.scale.pageAlignHorizontally = true;
  // PB.scale.pageAlignVertically = true;
  PB.game.physics.startSystem(Phaser.Physics.ARCADE);
}

const preload = () => {
  PB.game.load.image('preloadbar', 'assets/images/preloader-bar.png');
  PB.game.cursors = PB.game.input.keyboard.createCursorKeys();
}
const create = function() {
  console.log('What is this in create function bootState', this);
  PB.game.preloadBar = PB.game.add.sprite(PB.game.world.centerX, PB.game.world.centerY, 'preloadbar', 0);
  PB.game.preloadBar.anchor.setTo(0.5);
  PB.game.preloadBar.scale.setTo(5);
}
const update = () => {
  console.log('game running');
  PB.game.state.start('Preload');
}







const BootState = {
  init,
  preload,
  create,
  update
};

export default BootState;
