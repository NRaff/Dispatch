import { connect } from "react-redux"
import { requestLogoutUser } from "../../actions/session_actions"
import TopNav from "./top_nav"

const mapNamesToIds = users => {
  let allUsers = {}
  users.forEach(user => {
    allUsers[user.displayName] = user
  })
  return allUsers
}

const mSTP = state => ({
  currentUserId: state.session.userId,
  user: state.entities.users[state.session.userId],
  users: mapNamesToIds(Object.values(state.entities.users)),
})

const mDTP = dispatch => ({
  logout: () => dispatch(requestLogoutUser()),
  dispatch: dispatch
})

export default connect(mSTP,mDTP)(TopNav)