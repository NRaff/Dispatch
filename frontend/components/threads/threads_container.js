import { connect } from "react-redux"
import { createThread, deleteThread } from "../../actions/thread_actions"
import { receiveActiveThread, setupActiveThread } from "../../actions/ui_actions"
import ThreadsIndex from "./threads_index"
import * as RealtimeThread from "../../utils/thread_chat_socket"

const mSTP = state => ({
  threads: Object.values(state.entities.threads),
  activeThreadId: state.ui.activeThreadId,
  currentUserId: state.session.userId
})

const mDTP = dispatch => ({
  createSocket: threadId => RealtimeThread.createRealtimeThread(dispatch, threadId),
  createThread: newThread => dispatch(createThread(newThread)),
  deleteThread: threadId => dispatch(deleteThread(threadId)),
  setActiveThread: threadId => dispatch(setupActiveThread(threadId)),
  dispatch: dispatch
})

export default connect(mSTP,mDTP)(ThreadsIndex)