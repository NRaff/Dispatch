import { connect } from "react-redux"
import { setupActiveWorkspace } from "../../actions/ui_actions"
import WorkspaceIndex from "./ws_index"

const mSTP = state => ({
  currentUser: state.session.userId,
  workspaces: Object.values(state.entities.workspaces)
})

const mDTP = dispatch => ({
  setupWorkspace: payload => dispatch(setupActiveWorkspace(payload))
})

export default connect(mSTP, mDTP)(WorkspaceIndex)