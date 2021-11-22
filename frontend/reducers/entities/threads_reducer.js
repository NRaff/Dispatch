import { RECEIVE_ALL_THREADS, RECEIVE_THREAD, REMOVE_THREAD } from "../../actions/thread_actions"

const ThreadsReducer = (state={}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  switch(action.type){
    case RECEIVE_THREAD:
      nextState[action.thread.id] = action.thread
      return nextState;
    case RECEIVE_ALL_THREADS:
      nextState = action.threads
      return nextState;
    case REMOVE_THREAD:
      delete nextState[action.threadId]
      return nextState;
    default:
      return state;
  }

}

export default ThreadsReducer;