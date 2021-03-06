import { CLEAR_NEW_MESSAGE, RECEIVE_ACTIVE_THREAD, RECEIVE_ACTIVE_WORKSPACE } from "../actions/ui_actions";
import { NEW_MESSAGE } from "../actions/ui_actions";

const defaultState = {
  activeWorkspaceId: null,
  activeThreadId: null,
  newMessage: null
}

const UIReducer = (state=defaultState, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch(action.type) {
    case RECEIVE_ACTIVE_THREAD:
      nextState['activeThreadId'] = action.threadId
      return nextState;
    case RECEIVE_ACTIVE_WORKSPACE:
      nextState['activeWorkspaceId'] = action.workspaceId
    case NEW_MESSAGE:
      nextState['newMessage'] = action.message
      return nextState;
    case CLEAR_NEW_MESSAGE:
      nextState['newMessage'] = null
      return nextState;
    default:
      return state;
  }
}

export default UIReducer;