import React, { Component } from 'react';
import { connect } from 'react-redux';


import { changeGamePlaying } from '../reducers/players-reducer.js';

import BootState from '../gameStates/boot.js';
import PreloadState from '../gameStates/preload.js';
import MiniGameOneState from '../gameStates/minigame1/gameState.js';

//declare global variable for game

class gameContainer extends Component {

  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  render () {
    console.log('game container render');
    //TODO: REIMPLEMENT DISABLED ATTRIB ON FALSY RETURN
    if(this.props.gamePlaying === false){
      if(this.props.players && this.props.players.length >= 2) {
        console.log('enough players');
        return(
          <div className="col-md-6 gameContainer">
            <button type="button" className="btn btn-lg btn-info playButton" onClick={this.startGame}><span className="playBtnText">Play Game!</span></button>
          </div>
        );
      } else {
        console.log('not enough players');
        return (<div className="col-md-6 gameContainer"><button type="button" className="btn btn-lg btn-info playButton" onClick={this.startGame} ><span className="playBtnText">Play Game!</span></button><h6>Require Minimum Players: 2</h6></div>);
      }
    } else {
      //Game is Currently Playing
      return (<div className="col-md-6 gameContainer">
        <div id="game">

        </div>
      </div>);
    }
  }

  startGame() {
  //TODO: Remove elements in Game Container and replace with game
  //Flip redux state for game = true
  this.props.changeGamePlayState(true);
  console.log("what is PB before we start the game?");
  PB.game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game');
  PB.game.state.add('Boot', BootState);
  PB.game.state.add('Preload', PreloadState);
  PB.game.state.add('MiniGameOne', MiniGameOneState);
  PB.game.state.start('Boot');
  }
}




const mapProps = state => {
  return {
    players: state.players.allPlayers,
    gamePlaying: state.players.gamePlaying
  };
};

/* Note on mapDispatch
  below is short-hand for mapDispatch, creates key w/ value of anonymous function
  that dispatches the function that was passed in*/

/* Reference - full way to write mapDispatch */
const mapDispatch = dispatch => ({
  changeGamePlayState: (gamePlayState) => {
    console.log('changing game play state to be', gamePlayState);
    dispatch(changeGamePlaying(gamePlayState));
  }
});

export default connect(mapProps, mapDispatch)(gameContainer);
