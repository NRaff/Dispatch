import {
  RECEIVE_THREAD_ERRORS, REMOVE_THREAD_ERRORS
} from '../../actions/error_actions'

const ThreadErrorsReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_THREAD_ERRORS:
      nextState = action.errors
      return nextState
    case REMOVE_THREAD_ERRORS:
      return {};
    default:
      return state;
  }
}

export default ThreadErrorsReducer;