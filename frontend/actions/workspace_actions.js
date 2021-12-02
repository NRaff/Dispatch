export const RECEIVE_ALL_WORKSPACES = 'RECEIVE_ALL_WORKSPACES'
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE'
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE'

export const receiveAllWorkspaces = workspaces => ({
  type: RECEIVE_ALL_WORKSPACES,
  workspaces
})

export const receiveWorkspace = workspace => ({
  type: RECEIVE_WORKSPACE,
  workspace
})

export const removeWorkspace = workspace => ({
  type: REMOVE_WORKSPACE,
  workspace
})