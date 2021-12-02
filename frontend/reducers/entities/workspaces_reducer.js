import { RECEIVE_ALL_WORKSPACES } from "../../actions/workspace_actions"

const WorkspacesReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_ALL_WORKSPACES:
      nextState = action.workspaces
      return nextState;
    default:
      return state;
  }
}

export default WorkspacesReducer;