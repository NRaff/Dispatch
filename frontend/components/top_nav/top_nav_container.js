import { connect } from "react-redux"
import { requestLogoutUser } from "../../actions/session_actions"
import { fetchUser } from "../../actions/user_actions"
import TopNav from "./top_nav"

const mSTP = state => ({
  currentUserId: state.session.userId,
  user: state.entities.users[state.session.userId]
})

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  logout: () => dispatch(requestLogoutUser())
})

export default connect(mSTP,mDTP)(TopNav)