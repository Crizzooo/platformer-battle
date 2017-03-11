import React, { Component } from 'react';
import { connect } from 'react-redux';


import { changeGamePlaying } from '../reducers/players-reducer.js';

//declare global variable for game
let game;
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
   game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game', {init: init, preload: preload, create: create, update: update});
  };
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









function init(){
  this.game.stage.backgroundColor = '#da2dc3';
  this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  //TODO: WHAT DOES THIS SHIT DO?
  // this.scale.pageAlignHorizontally = true;
  // this.scale.pageAlignVertically = true;
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
}

function preload(){
  this.load.image('preloadbar', 'assets/images/preloader-bar.png');
}
function create(){
  const bar = this.game.add.sprite(game.centerX, game.centerY, 'preloadbar', 0);
}
function update(){
  console.log('game running');
}
