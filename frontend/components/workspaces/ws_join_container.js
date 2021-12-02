import { connect } from "react-redux"
import { withRouter } from "react-router"
import { setupActiveWorkspace } from "../../actions/ui_actions"
import WorkspaceCreate from "./ws_create"
import WorkspaceJoin from "./ws_join"

const mSTP = (state, ownProps) => ({
  currentUser: state.session.userId,
})

const mDTP = (dispatch, ownProps) => ({
  setupWorkspace: payload => dispatch(setupActiveWorkspace(payload)),
})

export const WorkspaceJoinContainer = withRouter(connect(mSTP,mDTP)(WorkspaceJoin))
export const WorkspaceCreateContainer = withRouter(connect(mSTP,mDTP)(WorkspaceCreate))