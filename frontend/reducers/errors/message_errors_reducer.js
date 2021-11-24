import {
  RECEIVE_MESSAGE_ERRORS,
  REMOVE_MESSAGE_ERRORS
} from '../../actions/error_actions'
import {
  RECEIVE_MESSAGE
} from '../../actions/message_actions'

const MessageErrorsReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_MESSAGE_ERRORS:
      nextState = action.errors
      return nextState;
    case RECEIVE_MESSAGE:
    case REMOVE_MESSAGE_ERRORS:
      return {};
    default:
      return state;
  }
}

export default MessageErrorsReducer;