import React from 'react';
import { connect } from 'react-redux'

import { addPlayer, createNewPlayer, loadPlayers } from '../reducers/index.js';


export class lobbyControls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      score: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLeaveGame = this.handleLeaveGame.bind(this);
  }

  handleChange(evt) {
    console.log(evt.target.value);
    this.setState({ name: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('Client is emitting this player obj:', this.state);
    socket.emit('playerJoined', this.state);
    $('#addPlayerModal').modal('hide');
  }

  handleLeaveGame(evt) {
    socket.emit('playerLeaveGame', this.props.currentPlayer);
  }

  render() {
    console.log('What is currentPlayer evaluate to:', this.props.currentPlayer);

    return (
      <div>
        {
          /* check if current player or not */
          this.props.players && this.props.players.length < 4 && !this.props.currentPlayer.name ?
            <button type="button" className="btn btn-lg btn-info btn-danger" data-target="#addPlayerModal" data-toggle="modal"><span className="playBtnText">Join Game!</span></button>
            :
            <div>
              <button type="button" className="btn btn-lg btn-info btn-warning" onClick={this.handleLeaveGame}><span className="playBtnText">Leave Game!</span></button>
              {this.props.players.length === 4 ?
              <h6>Maximum player count reached!</h6>
              :
              null
              }
            </div>
        }
        <div className="modal fade" id="addPlayerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">New Player Creation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="name" onChange={this.handleChange} className="form-control" id="playerNameInput" aria-describedby="namePlayer" placeholder="insert creative name here" />
                    <small id="namePlayer" className="form-text text-muted">please dont feed the trolls</small>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapProps = state => ({
  players: state.players,
  currentPlayer: state.currentPlayer
});

const mapDispatch = {
  addPlayer,
  loadPlayers
};


export default connect(mapProps, mapDispatch)(lobbyControls);
