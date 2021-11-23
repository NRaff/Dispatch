import { connect } from "react-redux"
import {
  createMessage,
  updateMessage,
  deleteMessage
} from '../../actions/message_actions'
import { fetchUsers } from "../../actions/user_actions"
import MessagesIndex from "./messages_index"

const mSTP = state => ({
  messages: Object.values(state.entities.messages),
  users: state.entities.users
})

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  createMessage: message => dispatch(createMessage(message)),
  updateMessage: message => dispatch(updateMessage(message)),
  deleteMessage: messageId => dispatch(deleteMessage(messageId))
})

export default connect(mSTP, mDTP)(MessagesIndex)