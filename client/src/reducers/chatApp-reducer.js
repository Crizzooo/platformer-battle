import axios from 'axios'

const initialState = {
  messages: ''
};

/* Reducer */
export default (state = initialState, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case LOAD_MESSAGES:
      newState.messages = action.messages;
      break;

    default:
      return state;
  }
  return newState
};

/* Action Types */
const LOAD_MESSAGES = 'LOAD_MESSAGES';

/* Action Creators */
export const loadMessage = allMessages => ({ type: LOAD_MESSAGES, allMessages });

/* Action Dispatchers */

/* - Reference - example dispatch function
  export const fetchPlayers = () => dispatch => {
    return axios.get('/players')
    .then(response => response.data)
    .then(players => dispatch(loadPlayers(players)))
  }; */
