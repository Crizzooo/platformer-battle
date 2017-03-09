import React from 'react';
import { connect } from 'react-redux'

import { addPlayer } from '../reducers/index.js';

export function lobbyControls(props) {
  return (
      <div>
          <button type="button" className="btn btn-lg btn-info btn-danger" onClick={() => props.addPlayer({name: 'Crizzo', score: 68}) }><span className="playBtnText">Join Game!</span></button>
      </div>
  );
}

const mapProps = state => {
};

const mapDispatch = {
  addPlayer
};


export default connect(null, mapDispatch)(lobbyControls);
