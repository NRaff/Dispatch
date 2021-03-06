import { connect } from "react-redux"
import {
  createMessage,
  updateMessage,
  deleteMessage,
  receiveMessage
} from '../../actions/message_actions'
import { fetchUsers } from "../../actions/user_actions"
import MessagesIndex from "./messages_index"
import {activeThreadMessages} from "../../utils/selectors"

const mSTP = state => {
  return ({
  messages: activeThreadMessages(state.ui.activeThreadId, Object.values(state.entities.messages)),
  users: state.entities.users,
  currentUserId: state.session.userId,
  activeThreadId: state.ui.activeThreadId,
  activeWorkspaceId: state.ui.activeWorkspaceId
})
}

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  createMessage: message => dispatch(createMessage(message)),
  updateMessage: message => dispatch(updateMessage(message)),
  deleteMessage: messageId => dispatch(deleteMessage(messageId)),
  receiveMessage: message => dispatch(receiveMessage(message)),
  clearMessages: () => dispatch(clearMessages()),
  dispatch: dispatch
})

export default connect(mSTP, mDTP)(MessagesIndex)