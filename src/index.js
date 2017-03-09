import React from 'react';
import ReactDOM from 'react-dom';

//Components
// import Header from './components/Header';

//Containers
import Layout from './containers/layout';

import {Provider} from 'react-redux';
import{ Router, Route, browserHistory, IndexRoute } from 'react-router';

import store from './store.js';

/* Actions to Dispatch */
import { loadMessage } from './reducers/index.js';

function sendMessage(str) {
  store.dispatch(loadMessage(str));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={() => sendMessage('WELCOME TO TEH GREATEST APP EVER')} >
        /* Children Components */
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
