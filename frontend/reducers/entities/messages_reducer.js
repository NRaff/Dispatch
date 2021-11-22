import {
  RECEIVE_ALL_MESSAGES,
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE
} from '../../actions/message_actions'

const MessagesReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, nextState)
  switch(action.type) {
    case RECEIVE_ALL_MESSAGES:
      nextState = action.messages
      return nextState;
    case RECEIVE_MESSAGE:
      nextState[action.message.id] = action.message
      return nextState;
    default:
      return state;
  }
}

export default MessagesReducer;