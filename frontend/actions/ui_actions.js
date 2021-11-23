export const RECEIVE_ACTIVE_THREAD = 'RECEIVE_ACTIVE_THREAD';

export const receiveActiveThread = threadId => ({
  type: RECEIVE_ACTIVE_THREAD,
  threadId
})