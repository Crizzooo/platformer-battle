import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import mainReducer from './reducers/index.js';

const store = createStore(
  mainReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      createLogger({collapsed: true})
    )
  )
);

export default store;
