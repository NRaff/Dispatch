import * as ThreadApi from '../utils/thread_api'
import { receiveThreadErrors } from './error_actions'

export const RECEIVE_THREAD = 'RECEIVE_THREAD'
export const RECEIVE_ALL_THREADS = 'RECEIVE_ALL_THREADS'
export const REMOVE_THREAD = 'REMOVE_THREAD'

export const receiveAllThreads = threads => ({
  type: RECEIVE_ALL_THREADS,
  threads
})

export const receiveThread = thread => ({
  type: RECEIVE_THREAD,
  thread
})

export const removeThread = threadId => ({
  type: REMOVE_THREAD,
  threadId
})

export const createThread = thread => dispatch => (
  ThreadApi.createThread(thread)
    .then( thread => dispatch(receiveThread(thread)))
    .fail(err => dispatch(receiveThreadErrors(err.responseJSON.errors)))
)

export const updateThread = thread => dispatch => (
  ThreadApi.updateThread(thread)
    .then( thread => dispatch(receiveThread(thread)))
    .fail(err => dispatch(receiveThreadErrors(err.responseJSON.errors)))
)

export const deleteThread = threadId => dispatch => (
  ThreadApi.deleteThread(threadId)
    .then( () => dispatch(removeThread(threadId)))
    .fail( err => dispatch(receiveThreadErrors(err.responseJSON.errors)))
)