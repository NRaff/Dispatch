import React from "react";
import { Link } from "react-router-dom";
import * as RealtimeUser from "../../utils/user_config_socket"

class NewThread extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      thread: {
        name: '',
        invitees: []
      },
      user: this.props.currentUser
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleInput(e) {
    e.preventDefault()
    let thread = this.state.thread
    thread['name'] = e.target.value
    this.setState({thread})
  }

  handleAdd(e) {
    let payload = {};
    payload['thread'] = this.state
    payload['thread']['invitees'] = [26, 27]
    payload['user'] = this.props.currentUser
    //link to the popover, pass payload as props
    RealtimeUser.receiveThread(payload)
    this.setState({
      thread: {
        name: '',
        invitees: []
      },
      user: this.props.currentUser
    })
  }

  // will need to come back to allow folks to add more info/invite people to it
  render() {
    const {createThread} = this.props
    const {thread} = this.state
    return (
      <div className='add-thread'>
        <input 
          type="text"
          value={thread.name}
          onChange={this.handleInput}
          placeholder='Create a thread'
        />
        <Link 
          to={`/new/${thread.name}`}
          className="add-btn"
        >➕</Link>
      </div>
    )
  }
}

export default NewThread;
