import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//Components
// import Header from './components/Header';

//Containers
import Layout from './containers/layout';
import Leaderboard from './components/Leaderboard';

import {Provider} from 'react-redux';
import{ Router, Route, browserHistory, IndexRoute } from 'react-router';

import store from './store.js';

/* Actions to Dispatch */
import attachFunctions from './sockets.js';

socket = io();
attachFunctions(socket);
//call function to attach socket actions;



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} >
       {
        //  <Route path="/leaderboard" component={Leaderboard} />
         /* Children Components */
       }
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
