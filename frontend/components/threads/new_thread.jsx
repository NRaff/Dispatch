import React from "react";
import { Link } from "react-router-dom";

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
    this.clearInputs = this.clearInputs.bind(this)
  }

  handleInput(e) {
    e.preventDefault()
    let thread = this.state.thread
    thread['name'] = e.target.value
    this.setState({thread})
  }

  clearInputs(e) {
    this.setState({
      thread: {
        name: '',
        invitees: []
      }
    })
  }

  render() {
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
          onClick={this.clearInputs}
        >➕</Link>
      </div>
    )
  }
}

export default NewThread;
