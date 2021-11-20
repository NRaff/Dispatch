import {
  RECEIVE_USER_ERRORS, REMOVE_USER_ERRORS
} from '../../actions/error_actions'

const UserErrorsReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      nextState = action.errors
      return nextState;
    case REMOVE_USER_ERRORS:
      return {};
    default:
      return state;
  }
}

export default UserErrorsReducer;