import { connect } from "react-redux"
import { withRouter } from "react-router"
import { setupActiveWorkspace } from "../../actions/ui_actions"
import WorkspaceIndex from "./ws_index"

const mSTP = (state, ownProps) => ({
  currentUser: state.session.userId,
  workspaces: Object.values(state.entities.workspaces),
  activeWorkspace: state.entities.workspaces[ownProps.match.params.workspace]
})

const mDTP = dispatch => ({
  setupWorkspace: payload => dispatch(setupActiveWorkspace(payload))
})

export default withRouter(connect(mSTP, mDTP)(WorkspaceIndex))