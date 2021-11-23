import { connect } from "react-redux"
import { createThread, deleteThread } from "../../actions/thread_actions"
import { receiveActiveThread } from "../../actions/ui_actions"
import ThreadsIndex from "./threads_index"

const mSTP = state => ({
  threads: Object.values(state.entities.threads),
  activeThreadId: state.ui.activeThreadId
})

const mDTP = dispatch => ({
  createThread: newThread => dispatch(createThread(newThread)),
  deleteThread: threadId => dispatch(deleteThread(threadId)),
  setActiveThread: threadId => dispatch(receiveActiveThread(threadId))
})

export default connect(mSTP,mDTP)(ThreadsIndex)