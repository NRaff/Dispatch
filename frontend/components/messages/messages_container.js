import { connect } from "react-redux"
import {
  createMessage,
  updateMessage,
  deleteMessage
} from '../../actions/message_actions'
import MessagesIndex from "./messages_index"

const mSTP = state => ({
  messages: Object.values(state.entities.messages)
})

const mDTP = dispatch => ({
  createMessage: message => dispatch(createMessage(message)),
  updateMessage: message => dispatch(updateMessage(message)),
  deleteMessage: messageId => dispatch(deleteMessage(messageId))
})

export default connect(mSTP, mDTP)(MessagesIndex)