import * as RealtimeThread from "../utils/thread_chat_socket"
export const RECEIVE_ACTIVE_THREAD = 'RECEIVE_ACTIVE_THREAD';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const CLEAR_NEW_MESSAGE = 'CLEAR_NEW_MESSAGE';

export const receiveActiveThread = threadId => ({
  type: RECEIVE_ACTIVE_THREAD,
  threadId
})

export const newMessage = message => ({
  type: NEW_MESSAGE,
  message
})

export const clearNewMessage = () => ({
  type: CLEAR_NEW_MESSAGE
})

export const setupActiveThread = threadId => dispatch => {
  RealtimeThread.getThreadMessages({ threadId: threadId })
  dispatch(receiveActiveThread(threadId))
}