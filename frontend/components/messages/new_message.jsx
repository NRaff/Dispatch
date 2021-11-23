import React from "react";

class NewMessage extends React.Component {
  constructor(props) {
    super(props)
    // hardcoding the thread id until a later date
    this.state = {
      threadId: 30,
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
    this.props.createMessage(this.state)
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