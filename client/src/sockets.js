import store from './store.js';

import { loadPlayers } from './reducers/index.js';


const attachFunctions = (socket) => {
  socket.on('playerUpdate', updatePlayerState);
  //socket.on('event2', function2)
};

function updatePlayerState(players) {
  console.log('Socket received players from server:', players);
  //dispatch loadPlayers with players
  store.dispatch(loadPlayers(players));
}

export default attachFunctions;
