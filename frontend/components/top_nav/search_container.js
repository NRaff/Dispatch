import { connect } from "react-redux"
import { withRouter } from "react-router"
import Search from "./search"

const mapNamesToIds = users => {
  let allUsers = {}
  users.forEach(user => {
    allUsers[user.displayName] = user
  })
  return allUsers
}

const mSTP = (state, props) => {
  // debugger
  return ({
  currentUserId: state.session.userId,
  user: state.entities.users[state.session.userId],
  users: mapNamesToIds(Object.values(state.entities.users)),
  activeThreadId: state.ui.activeThreadId,
  activeThread: state.entities.workspaces[props.match.params.workspace]
})}

export default withRouter(connect(mSTP)(Search))
