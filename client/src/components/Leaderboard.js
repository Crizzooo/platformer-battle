import React from 'react';
import { connect } from 'react-redux'

export function Leaderboard(props) {
  let players = props.players.sort((a, b) => b.score - a.score)
  return (
      <div className="col-md-6 leaderboard">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              players && players.map((player, index) => {
                return (
                  <tr>
                    <th scope="row">{1 + index}</th>
                    <td>{player.name}</td>
                    <td>{player.score}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
  )
}

const mapState = state => ({
  players: state.players
})

export default connect(mapState)(Leaderboard)
