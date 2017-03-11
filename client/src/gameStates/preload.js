



const init = () => {
  PB.game.stage.backgroundColor = '#7c79fa';
}

const preload = () => {
  //load assets that are used across all games
  PB.game.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
  PB.game.preloadBar = PB.game.add.sprite(PB.game.world.centerX, PB.game.world.centerY, 'preloadbar', 0);
  PB.game.preloadBar.anchor.setTo(0.5);
  PB.game.preloadBar.scale.setTo(5);
  PB.game.load.setPreloadSprite(PB.game.preloadBar);
}
const create = () => {
  //launch next game state;
  console.log('launching MGO');
  PB.game.state.start('MiniGameOne', true, false, 'Launching Mini Game One \nEnjoy Yourselves!');
}
const update = () => {

}







const PreloadState = {
  init,
  preload,
  create,
  update
};

export default PreloadState;
