import React from "react";
import * as RealtimeUser from "../../utils/user_config_socket"

class NewThread extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleInput(e) {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }

  handleAdd(e) {
    const {createThread} = this.props
    // createThread(this.state)
    let payload = {};
    payload['thread'] = this.state
    payload['thread']['invitees'] = [26, 27]
    payload['user'] = this.props.currentUser
    RealtimeUser.receiveThread(payload)
    this.setState({
      name: ''
    })
  }

  // will need to come back to allow folks to add more info/invite people to it
  render() {
    const {createThread} = this.props
    return (
      <div className='add-thread'>
        <input 
          type="text"
          value={this.state.name}
          onChange={this.handleInput}
          placeholder='Create a thread'
        />
        <button
          onClick={this.handleAdd}
        >➕</button>
      </div>
    )
  }
}

export default NewThread;
