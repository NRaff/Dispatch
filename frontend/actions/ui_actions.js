import * as RealtimeThread from "../utils/sockets"
export const RECEIVE_ACTIVE_THREAD = 'RECEIVE_ACTIVE_THREAD';

export const receiveActiveThread = threadId => ({
  type: RECEIVE_ACTIVE_THREAD,
  threadId
})

export const setupActiveThread = threadId => dispatch => {
  // RealtimeThread.createRealtimeThread(dispatch, threadId)
  RealtimeThread.getThreadMessages({ threadId: threadId })
  dispatch(receiveActiveThread(threadId))
}