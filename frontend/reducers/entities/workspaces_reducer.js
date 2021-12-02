import { 
  RECEIVE_ALL_WORKSPACES,
  RECEIVE_WORKSPACE,
  REMOVE_WORKSPACE
} from "../../actions/workspace_actions"

const WorkspacesReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_ALL_WORKSPACES:
      nextState = action.workspaces
      return nextState;
    case RECEIVE_WORKSPACE:
      nextState[action.workspace.id] = action.workspace
      return nextState;
    case REMOVE_WORKSPACE:
      delete nextState[action.workspaceId]
      return nextState
    default:
      return state;
  }
}

export default WorkspacesReducer;