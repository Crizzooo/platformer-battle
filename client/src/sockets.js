import store from './store.js';
import { loadPlayers, setCurrentPlayer, changeGamePlaying } from './reducers/players-reducer.js';
import { loadMessages, addMessage } from './reducers/chatApp-reducer.js';

import BootState from './gameStates/boot.js';
import PreloadState from './gameStates/preload.js';
import MiniGameOneState from './gameStates/minigame1/gameState.js';


const attachFunctions = (socket) => {
  socket.on('playerUpdate', dispatchPlayerUpdates);
  socket.on('currentPlayer', dispatchCurrentPlayer);
  socket.on('messagesUpdate', dispatchNewMessage);
  socket.on('turnOnGameComponent', dispatchGameTrue);
  socket.on('startGame', startClientGame);
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
  console.log('Store will receive a new message:', msgObj);
  store.dispatch(addMessage(msgObj));
}

// function dispatchNewGame(players) {
//   store.dispatch(changeGamePlaying(true));
// }

function dispatchGameTrue(){
  console.log('Sockets are telling game component to render!');
  store.dispatch(changeGamePlaying(true));
}

function startClientGame(players) {
  console.log('Sockets are starting games with Players:', players);
  PB.game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game');
  PB.game.state.add('Boot', BootState);
  PB.game.state.add('Preload', PreloadState);
  PB.game.state.add('MiniGameOne', MiniGameOneState);
  PB.game.state.start('Boot', true, false, players);
}

function dispatchNewGameState(){}

export default attachFunctions;
