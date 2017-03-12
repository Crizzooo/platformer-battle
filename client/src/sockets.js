import store from './store.js';
import { loadPlayers, setCurrentPlayer, changeGamePlaying } from './reducers/players-reducer.js';
import { loadMessages, addMessage } from './reducers/chatApp-reducer.js';
import { dispatchGameUpdate } from './reducers/gameState-reducer.js';

import BootState from './gameStates/boot.js';
import PreloadState from './gameStates/preload.js';
import MiniGameOneState from './gameStates/minigame1/gameState.js';


const attachFunctions = (socket) => {
  socket.on('playerUpdate', dispatchPlayerUpdates);
  socket.on('currentPlayer', dispatchCurrentPlayer);
  socket.on('messagesUpdate', dispatchNewMessage);
  socket.on('turnOnGameComponent', dispatchGameTrue);
  socket.on('startGame', startClientGame);
  socket.on('GameStateChange', dispatchNewGameState);
};

function dispatchPlayerUpdates(players) {
  console.log('Received Players:', players);
  //dispatch loadPlayers with players
  store.dispatch(loadPlayers(players));
}

function dispatchCurrentPlayer(playerObj) {
  store.dispatch(setCurrentPlayer(playerObj));
}

//sample function
export function dispatchNewMessage(msgObj) {
  store.dispatch(addMessage(msgObj));
}

function dispatchGameTrue(){
  store.dispatch(changeGamePlaying(true));
}

function startClientGame(players) {
  console.log('Sockets are starting games with Players:', PB.customParams.players);
  PB.game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game');
  PB.game.state.add('Boot', BootState);
  PB.game.state.add('Preload', PreloadState);
  PB.game.state.add('MiniGameOne', MiniGameOneState);
  PB.game.state.start('Boot', true, false, players);
}

function dispatchNewGameState(playerObjects) {
  console.log('client received new GameState:', playerObjects);
  store.dispatch(dispatchGameUpdate(playerObjects));
}

export default attachFunctions;
