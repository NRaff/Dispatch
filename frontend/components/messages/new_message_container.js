import { connect } from "react-redux";
import { removeMessageErrors } from "../../actions/error_actions";
import { createMessage } from "../../actions/message_actions";
import NewMessage from "./new_message";

const mSTP = state => ({
  activeThreadId: state.ui.activeThreadId,
  errors: Object.keys(state.errors.messageErrors),
  userId: state.session.userId
})

const mDTP = dispatch => ({
  createMessage: message => dispatch(createMessage(message)),
  removeErrors: () => dispatch(removeMessageErrors())
})

export default connect(mSTP, mDTP)(NewMessage)