import React from "react";

class NewMessage extends React.Component {
  constructor(props) {
    super(props)
    // hardcoding the thread id until a later date
    this.state = {
      message: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }

  handleInput(e) {
    let nextState = Object.assign({}, this.state)
    nextState[e.target.id] = e.target.value
    this.setState(nextState)
  }

  handleSend(e){
    let message = Object.assign({}, this.state)
    message['threadId'] = this.props.activeThreadId
    this.props.createMessage(message)
    this.setState({
      message: ''
    })
  }

  render(){

    return (
      <div className='new-message'>
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