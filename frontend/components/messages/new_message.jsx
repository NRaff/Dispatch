import React from "react";
import * as RealtimeThread from '../../utils/sockets'

class NewMessage extends React.Component {
  constructor(props) {
    super(props)
    // hardcoding the thread id until a later date
    this.state = {
      senderId: this.props.userId,
      message: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }

  componentWillUnmount(){
    this.props.removeErrors();
  }

  handleInput(e) {
    let nextState = Object.assign({}, this.state)
    nextState[e.target.id] = e.target.value
    this.setState(nextState)
  }

  handleSend(e){
    let message = Object.assign({}, this.state)
    message['threadId'] = this.props.activeThreadId
    RealtimeThread.newMessage({message})
    this.setState({
      message: ''
    })
  }

  displayErrors() {
    const { errors } = this.props
    const displayText = {
      thread: "Make sure you've selected a thread!",
      message: "You're message can't be empty."
    }
    let ui_errors = errors.filter(err => Object.keys(displayText).includes(err))
    if (errors.length > 0) {
      return (
        <ul className='errorSection'>
          {
            ui_errors.map((err, idx) => (
              <li key={idx} className='errorItem'>{`${displayText[err]}`}</li>
            ))
          }
        </ul>
      )
    }
  }

  render(){

    return (
      <div className='new-message'>
        {this.displayErrors()}
        <textarea
          id="message"
          cols="30"
          rows="3"
          value={this.state.message}
          onChange={this.handleInput}
          placeholder='Send a message...'
        ></textarea>
        <button
          onClick={this.handleSend}
          className='ui-button'
        >Send</button>
      </div>
    )
  }
}

export default NewMessage;