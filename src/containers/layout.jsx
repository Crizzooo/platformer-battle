import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

import Leaderboard from '../components/Leaderboard';
import gameContainer from './containers/gameContainer';

class Layout extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    console.log('layout rendering');
    return (
      <div>
        <Header />
        <Leaderboard />
        { this.props.children }
        <gameContainer />
        { /* Lobby */ }
        { /* Footer? */}
      </div>
    );
  }
}


const mapProps = state => {
  console.log('2 STATE GIVEN TO LAYOUT: ', state);
  return {
    message: state.message
  };

};

const mapDispatch = dispatch => ({
  /*fetchInitialData: () => {
    dispatch(fetchProducts());

  }*/

});


export default connect(mapProps, mapDispatch)(Layout);
