import {
  RECEIVE_ALL_USERS,
  RECEIVE_USER,
  REMOVE_USER
} from '../../actions/user_actions'

const UsersReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch(action.type) {
    case RECEIVE_ALL_USERS:
      nextState = action.users
      return nextState;
    case RECEIVE_USER:
      nextState[action.user.id] = action.user
      return nextState;
    case REMOVE_USER:
      delete nextState[action.userId]
      return nextState
    default:
      return state;
  }
}

export default UsersReducer;