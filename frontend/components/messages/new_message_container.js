import { connect } from "react-redux";
import { createMessage } from "../../actions/message_actions";
import NewMessage from "./new_message";

const mDTP = dispatch => ({
  createMessage: message => dispatch(createMessage(message)),
})

export default connect(null, mDTP)(NewMessage)