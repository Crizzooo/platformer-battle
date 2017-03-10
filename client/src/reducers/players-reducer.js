import axios from 'axios'

//Note: addPlayer can probably be removed from file but will keep for now in case we change structure
const initialState = {
  message: 'bye',
  allPlayers: [],
  currentPlayer: {}
};

/* Reducer */
export default (state = initialState, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case LOAD_PLAYERS:
      newState.allPlayers = action.allPlayers;
      break;

    case SET_CURRENT_PLAYER:
      newState.currentPlayer = action.player;
      break;

    // case ADD_PLAYER:
    //   newState.allPlayers = [...newState.allPlayers, action.player];
    //   break;

    default:
      return state;
  }

  return newState
};

/* Action Types */
// const ADD_PLAYER = 'ADD_PLAYER';
const LOAD_PLAYERS = 'LOAD_PLAYERS';
const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';

/* Action Creators */
export const loadMessage = message => ({ type: CHANGE_MESSAGE, message });
// export const addPlayer = player => ({type: ADD_PLAYER, player});
export const loadPlayers = allPlayers => ({type: LOAD_PLAYERS, allPlayers})
export const setCurrentPlayer = player => ({type: SET_CURRENT_PLAYER, player});

/* Action Dispatchers */
export const fetchPlayers = () => dispatch => {
  return axios.get('/players')
  .then(response => response.data)
  .then(players => dispatch(loadPlayers(players)))
};

/* Reference - old post route for creating new players
  export const createNewPlayer = (player) => {
    console.log('createNewPlayer is sending: ', player);
    axios.post('/player', player);
  }; */
