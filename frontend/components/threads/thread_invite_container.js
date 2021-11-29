import { connect } from "react-redux"
import { withRouter } from "react-router"
import ThreadInvite from "./thread_invite"

const mapNamesToIds = users => {
  let allUsers = {}
  users.forEach(user => {
    allUsers[user.displayName] = user
  })
  return allUsers
}

const mSTP = (state, props) => {
  return ({
    users: mapNamesToIds(Object.values(state.entities.users)),
    thread: props.match.params.thread,
    currentUser: state.session.userId
  })
}

export default withRouter(connect(mSTP)(ThreadInvite))