import React from 'react';
import { connect } from 'react-redux'


function ChatApp(props) {

  return (
      <div className="chatComponents">
          <div id="messageDisplay">
              <ul>
                <li>
                  Message1!
                </li>
                <li>
                  Message2!
                </li>
              </ul>
          </div>
          <div className="chatFooter">
            <form>
              <div className="messageForm">
                <input id="createMessage" autoComplete="off" placeholder="Talk some smack here..."/>
                <button type="button" id="sendMessage" className="btn btn-primary btn-sm">
                  Send!
                </button>
              </div>
            </form>
          </div>
      </div>
  )
}

const mapState = state => ({
  // messages: state.chatApp.messages
});

export default connect(mapState)(ChatApp);
