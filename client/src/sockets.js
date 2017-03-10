import store from './store.js';

import { loadPlayers, setCurrentPlayer } from './reducers/index.js';


const attachFunctions = (socket) => {
  socket.on('playerUpdate', dispatchPlayerUpdates);
  socket.on('currentPlayer', dispatchCurrentPlayer);
};

function dispatchPlayerUpdates(players) {
  console.log('Socket received players from server:', players);
  //dispatch loadPlayers with players
  store.dispatch(loadPlayers(players));
}

function dispatchCurrentPlayer(playerObj) {
  console.log('Store will receive current Player:', playerObj);
  store.dispatch(setCurrentPlayer(playerObj));
}

export default attachFunctions;
