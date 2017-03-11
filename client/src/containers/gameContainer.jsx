import React, { Component } from 'react';
import { connect } from 'react-redux';

class gameContainer extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    console.log('game container render');
    if(this.props.players && this.props.players.length >= 2) {
      return(
        <div className="col-md-6 gameContainer">
          <button type="button" className="btn btn-lg btn-info playButton"><span className="playBtnText">Play Game!</span></button>
        </div>
      );
    } else {
      return (<div className="col-md-6 gameContainer"><button type="button" className="btn btn-lg btn-info playButton" onClick={() => {} } disabled><span className="playBtnText">Play Game!</span></button><h6>Require Minimum Players: 2</h6></div>);
    }
  }
}

const mapProps = state => {
  return {
    players: state.players.allPlayers
  };
};

/* Note on mapDispatch
  below is short-hand for mapDispatch, creates key w/ value of anonymous function
  that dispatches the function that was passed in*/
const mapDispatch = {}

export default connect(mapProps)(gameContainer);

/* Reference - full way to write mapDispatch
  const mapDispatch = dispatch => ({
    fetchInitialData: () => {
      dispatch(fetchProducts());
  }*/
