import React from "react";
import * as RealtimeUser from '../../utils/user_config_socket'

class WorkspaceJoin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: this.props.currentUser,
      workspace: {
        keycode: ''
      }
    }
    this.handleJoin = this.handleJoin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }


  handleJoin(e){
    const payload = this.state
    RealtimeUser.joinWorkspace(payload)
    this.setState({
      user: this.props.currentUser,
      workspace: {
        keycode: ''
      }
    })
  }

  handleChange(e) {
    let workspace = Object.assign({}, this.state.workspace)
    workspace.keycode = e.target.value
    this.setState({workspace})
  }

  handleClose(e) {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className='workspace-overlay'>
        <section
          className='workspace-info workspace-join'
        >
          <h1>Join a Workspace</h1>
          <span 
            className='close'
            onClick={this.handleClose}
          >&times;</span>
          <input
            type="text"
            value={this.state.workspace.keycode}
            onChange={this.handleChange}
            placeholder='Paste keycode here...'
          />
          <button
            className='ui-button'
            onClick={this.handleJoin}
          >Join</button>
        </section>
      </div>
    )
  }
}

export default WorkspaceJoin;