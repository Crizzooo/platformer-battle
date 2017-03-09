import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

import Leaderboard from '../components/Leaderboard';
import GameContainer from './gameContainer.jsx';




class Layout extends Component {

  constructor(props) {
    super(props);
    this.socket = {};
  }

  componentDidMount() {
    console.log("Layout mounted - creating socket!");
    this.socket = io();
    console.log(this.socket);
  }

  render () {
    console.log('layout rendering');
    return (
      <div>
        <Header />
        <div className="container mainContainer">
          <div className="row">
            <Leaderboard />
            { this.props.children }
            <GameContainer />
          </div>
        </div>
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
