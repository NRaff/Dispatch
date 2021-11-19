import {
  RECEIVE_MESSAGE_ERRORS
} from '../../actions/error_actions'

const MessageErrorsReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_MESSAGE_ERRORS:
      nextState = action.errors
      return nextState
    default:
      return state;
  }
}

export default MessageErrorsReducer;