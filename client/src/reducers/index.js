import axios from 'axios'
//players: [ {name: 'x', score: 1} ]
// players: [{name: 'Omer', score: 77}, {name: 'Chris', score: 88}, {name: 'Skins', score: 99}, {name: 'Jimmy', score: 33}, {name: '2pac', score: 66}, {name: 'Charlie', score: 44}]
const initialState = {
  message: 'bye',
  players: [],
  currentPlayer: {}
};

/* Reducer */

export default (state = initialState, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case CHANGE_MESSAGE:
      newState.message = action.message;
      break;

    case ADD_PLAYER:
      newState.players = [...newState.players, action.player];
      break;

    case LOAD_PLAYERS:
      newState.players = action.players;
      break;

    case SET_CURRENT_PLAYER:
      newState.currentPlayer = action.player;
      break;

    default:
      return state;
  }

  return newState
};

/* Action Types */
const CHANGE_MESSAGE = 'CHANGE_MESSAGE';
const ADD_PLAYER = 'ADD_PLAYER';
const LOAD_PLAYERS = 'LOAD_PLAYERS';
const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';

/* Action Creators */
export const loadMessage = message => ({ type: CHANGE_MESSAGE, message });
export const addPlayer = player => ({type: ADD_PLAYER, player});
export const loadPlayers = players => ({type: LOAD_PLAYERS, players})
export const setCurrentPlayer = player => ({type: SET_CURRENT_PLAYER, player});

/* Action Dispatchers */

export const fetchPlayers = () => dispatch => {
  return axios.get('/players')
  .then(response => response.data)
  .then(players => dispatch(loadPlayers(players)))
};

// export const createNewPlayer = (player) => {
//   console.log('createNewPlayer is sending: ', player);
//   axios.post('/player', player);
// };
