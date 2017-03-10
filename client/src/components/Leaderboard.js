import React from 'react';
import { connect } from 'react-redux'

import LobbyControls from './lobbyControls';
import ChatApp from './chatApp.jsx';

function Leaderboard(props) {
  let players = props.players.sort((a, b) => b.score - a.score);
  let playerRows = [];
  //loop through player count - create player objects
  console.log('Leaderboard rerendering with players:', players);
  console.log('Players length:', players.length);
  console.log('diff: ', 4 - players.length)
  let livePlayers = players.map( (player, index) => {
    console.log('logging live player row');
    return (<tr key={'player' + (index + 1)}>
      <th scope="row">{1 + index}</th>
      <td>{player.name}</td>
      <td>{player.score}</td>
    </tr>);
  })
  playerRows.push(...livePlayers);

  const livePlayerCount = livePlayers.length;
  for ( var i = 4 - livePlayerCount; i > 0; i--){
    console.log('pushing empty row at i', i);
    playerRows.push( (<tr key={'player' + (playerRows.length + 1)}>
      <th scope="row">{playerRows.length + 1}</th>
      <td>Joinable Slot!</td>
      <td>--</td>
    </tr>))
  }

  //4 - player count times, create empty rows
  console.log('Rendering playerRows:', playerRows);
  return (
      <div className="col-md-6 leaderboard">
        <table className="table table-striped table-inverse table-hover">
          <thead className="thead-inverse">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              playerRows && playerRows.map((playerElement, index) => {
                return playerElement;
              })
            }
          </tbody>
        </table>
        <LobbyControls />
        <div className="chatContainer">
          <ChatApp />
        </div>
      </div>
  )
}

const mapState = state => ({
  players: state.players
})

export default connect(mapState)(Leaderboard)
