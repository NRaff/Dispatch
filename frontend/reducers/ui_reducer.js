import { RECEIVE_ACTIVE_THREAD } from "../actions/ui_actions";

const defaultState = {
  activeThreadId: null
}

const UIReducer = (state=defaultState, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch(action.type) {
    case RECEIVE_ACTIVE_THREAD:
      nextState['activeThreadId'] = action.threadId
      return nextState
    default:
      return state;
  }
}

export default UIReducer;