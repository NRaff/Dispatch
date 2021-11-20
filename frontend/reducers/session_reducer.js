import { 
  LOGIN_USER, 
  LOGOUT_USER 
} from "../actions/session_actions"

const defaultState = {
  userId: null
}

const SessionReducer = (state=defaultState, action) => {
  Object.freeze(state)
  let nextState = Object.assign({},state)
  switch(action.type) {
    case LOGIN_USER:
      nextState.userId = action.user.id
      return nextState;
    case LOGOUT_USER:
      nextState.userId = null
      return nextState;
    default:
      return state
  }
}

export default SessionReducer;

