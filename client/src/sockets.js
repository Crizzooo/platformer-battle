import store from './store.js';
import { loadPlayers, setCurrentPlayer } from './reducers/players-reducer.js';
import { loadMessages, addMessage } from './reducers/chatApp-reducer.js';


const attachFunctions = (socket) => {
  socket.on('playerUpdate', dispatchPlayerUpdates);
  socket.on('currentPlayer', dispatchCurrentPlayer);
  socket.on('messagesUpdate', dispatchNewMessage)
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

//sample function

function dispatchNewMessage(message) {
  console.log('Store will receive a new message:', message)
  store.dispatch(addMessage(message))
}

export default attachFunctions;
