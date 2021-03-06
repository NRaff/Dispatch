import { connect } from 'react-redux'
import {
  updateMessage
} from '../../actions/message_actions'
import EditMessage from './edit_message'
import { withRouter } from 'react-router'

const mSTP = (state, ownProps) => ({
  message: state.entities.messages[ownProps.match.params.messageId],
  errors: state.errors.messageErrors,
  userId: state.session.userId
})

const mDTP = dispatch => ({
  updateMessage: message => dispatch(updateMessage(message)),
  removeErrors: () => dispatch(removeMessageErrors()),
  dispatch: dispatch
})

export default withRouter(connect(mSTP, mDTP)(EditMessage))