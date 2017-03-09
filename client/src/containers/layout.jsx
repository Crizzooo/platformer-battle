import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Layout extends Component {

  constructor(props) {
    super(props);
  }


  render () {
    return (
      <div>
        <Header />
        { this.props.children }
        { /* Leaderboard */ }
        { /* Lobby */ }
        { /* Footer? */}
      </div>
    );
  }
}

const mapProps = state => {
  console.log('STATE GIVEN TO LAYOUT: ', state);
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
