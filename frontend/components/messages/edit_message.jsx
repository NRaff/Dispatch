import React from "react";
import * as RealtimeThread from '../../utils/thread_chat_socket'

class EditMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.message
    this.handleInput = this.handleInput.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleInput(e){
    let nextState = Object.assign({}, this.state)
    nextState[e.target.id] = e.target.value
    this.setState(nextState)
  }

  handleUpdate(e){
    let payload = {message: this.state}
    payload['currentUserId'] = this.props.userId
    RealtimeThread.updateMessage(payload)
    this.props.history.goBack()
  }


  render(){
    return (
      <div className='edit-overlay'>
        <div className='edit-popover'>
          <h1>Edit Message</h1>
          <textarea
            id="message"
            cols="30"
            rows="3"
            value={this.state.message}
            onChange={this.handleInput}
            placeholder='Send a message...'
          ></textarea>
          <div className='edit-options'>
            <button
              onClick={this.props.history.goBack}
              className='ui-button cancel'
            >Cancel</button>
            <button
              onClick={this.handleUpdate}
              className='ui-button save'
            >Save changes</button>
          </div>
        </div>
      </div>
    )
  }
}

export default EditMessage;