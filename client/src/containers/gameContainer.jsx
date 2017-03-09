import React, { Component } from 'react';
import { connect } from 'react-redux';

class gameContainer extends Component {

  constructor(props) {
    super(props);
  }


  render () {
    console.log('game container render');
    return (
        <div className="col-md-6 gameContainer">
          <button type="button" className="btn btn-lg btn-success playButton"></button>
        </div>
    );
  }
}

const mapProps = state => {
  return {};

};

const mapDispatch = dispatch => ({

});


export default connect(mapProps, mapDispatch)(gameContainer);
