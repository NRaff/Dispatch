import React from "react";
import * as RealtimeUser from '../../utils/user_config_socket'

class WorkspaceCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.currentUser,
      workspace: {
        name: ''
      }
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }


  handleCreate(e) {
    const payload = this.state
    RealtimeUser.createWorkspace(payload)
    this.setState({
      user: this.props.currentUser,
      workspace: {
        name: ''
      }
    })
    this.props.history.goBack()
  }

  handleChange(e) {
    let workspace = Object.assign({}, this.state.workspace)
    workspace.name = e.target.value
    this.setState({ workspace })
  }

  handleClose(e) {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className='workspace-overlay'>
        <section
          className='workspace-info workspace-create'
        >
          <h1>Create a Workspace</h1>
          <span
            className='close'
            onClick={this.handleClose}
          >&times;</span>
          <input
            type="text"
            value={this.state.workspace.name}
            onChange={this.handleChange}
            placeholder='Workspace name...'
          />
          <button
            className='ui-button'
            onClick={this.handleCreate}
          >Create</button>
        </section>
      </div>
    )
  }
}

export default WorkspaceCreate;