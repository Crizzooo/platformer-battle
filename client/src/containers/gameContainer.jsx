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
      return (<div className="col-md-6 gameContainer"><button type="button" className="btn btn-lg btn-info playButton" onClick={() => props.addPlayer({name: 'Crizzo', score: 68}) } disabled><span className="playBtnText">Play Game!</span></button><h6>Require Minimum Players: 2</h6></div>);
    }
  }
}

const mapProps = state => {
  return {
    players: state.players
  };

};

const mapDispatch = dispatch => ({

});


export default connect(mapProps, mapDispatch)(gameContainer);
