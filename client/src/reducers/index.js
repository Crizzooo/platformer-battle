

const initialState = {
  message: 'bye',
  players: [{name: 'Omer', score: 77}, {name: 'Chris', score: 88}, {name: 'Skins', score: 99}, {name: 'Jimmy', score: 33}, {name: '2pac', score: 66}, {name: 'Charlie', score: 44}]
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

    default:
      return state;
  }

  return newState
};

/* Action Types */
const CHANGE_MESSAGE = 'CHANGE_MESSAGE';
const ADD_PLAYER = 'ADD_PLAYER';

/* Action Creators */
export const loadMessage = message => ({ type: CHANGE_MESSAGE, message });
export const addPlayer = player => ({type: ADD_PLAYER, player});

/* Action Dispatchers */
export const changeMessage = (message) => dispatch => {
  console.log('change message was called with:', message);
  dispatch(loadMessage(message));
};
