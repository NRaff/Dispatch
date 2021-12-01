import { connect } from "react-redux"
import { clearNewMessage } from "../../actions/ui_actions"
import Notification from "./notification"

const threadId = state => {
  if (state.ui.newMessage) {
    return state.ui.newMessage.threadId
  }
}

const mSTP = state => ({
  fromThread: state.entities.threads[threadId(state)],
  activeThread: state.ui.activeThreadId,
  message: state.ui.newMessage,
  users: state.entities.users,
  currentUser: state.session.userId
})

const mDTP = dispatch => ({
  clearNotification: () => dispatch(clearNewMessage())
})

export default connect(mSTP, mDTP)(Notification)