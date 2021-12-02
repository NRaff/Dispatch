import React from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Icons } from "../../utils/theme"

const mSTP = (state, props) => ({
  workspace: state.entities.workspaces[props.match.params.workspace]
})

const WorkspaceHeader = ({workspace}) => {
  return (
    <Link
      to={`/${workspace.id}/info`}
      className='workspace-header'
    >
      <h1>{workspace.name}</h1>
      <img className={Icons.share.lightShare} alt="share icon" />
    </Link>
  )
}

export default withRouter(connect(mSTP, null)(WorkspaceHeader));