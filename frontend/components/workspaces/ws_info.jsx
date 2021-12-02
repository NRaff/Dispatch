import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const mSTP = (state, props) => ({
  workspace: state.entities.workspaces[props.match.params.workspace]
})

class WorkspaceInfo extends React.Component {
  constructor(props) {
    super(props)
    this.copykeycode = this.copykeycode.bind(this)
    this.close = this.close.bind(this)
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
        </section>
      </div>
    )
  }
}

export default withRouter(connect(mSTP,null)(WorkspaceInfo));