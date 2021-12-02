export const RECEIVE_ALL_WORKSPACES = 'RECEIVE_ALL_WORKSPACES'

export const receiveAllWorkspaces = workspaces => ({
  type: RECEIVE_ALL_WORKSPACES,
  workspaces
})