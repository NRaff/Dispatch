import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import * as RealtimeUser from '../../utils/user_config_socket'

const mSTP = (state, props) => ({
  workspace: state.entities.workspaces[props.match.params.workspace],
  user: state.session.userId
})

class WorkspaceInfo extends React.Component {
  constructor(props) {
    super(props)
    this.copykeycode = this.copykeycode.bind(this)
    this.close = this.close.bind(this)
    this.leaveWorkspace = this.leaveWorkspace.bind(this)
  }
  componentDidMount(){
    this.copykeycode()
  }

  close(){
    this.props.history.goBack()
  }

  copykeycode(){
    navigator.clipboard.writeText(this.props.workspace.keycode)
  }

  leaveWorkspace() {
    const { workspace, user } = this.props
    const payload = {
      user: user,
      workspace: workspace.id
    }
    RealtimeUser.leaveWorkspace(payload)
  }
  render(){
    const {workspace} = this.props
    return (
      <div className='workspace-overlay'>
          <section className='workspace-info'>
            <h1>{workspace.name}</h1>
            <span
              className='close'
              onClick={this.close}
            >&times;</span>
            <p
              onClick={this.copykeycode}
              className='workspace-keycode'
            >{workspace.keycode}</p>
            <p className='workspace-note'>
              Share this code to let people join your workspace. <span>Already copied to your clipboard!</span>
            </p>
            <Link 
              to='/'
              className='ui-button'
              onClick={this.leaveWorkspace}
            >Leave</Link>
          </section>
      </div>
    )
  }
}

export default withRouter(connect(mSTP,null)(WorkspaceInfo));