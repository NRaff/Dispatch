import { connect } from "react-redux"
import { createThread, deleteThread } from "../../actions/thread_actions"
import ThreadsIndex from "./threads_index"

const mSTP = state => ({
  threads: Object.values(state.entities.threads)
})

const mDTP = dispatch => ({
  createThread: newThread => dispatch(createThread(newThread)),
  deleteThread: threadId => dispatch(deleteThread(threadId))
})

export default connect(mSTP,mDTP)(ThreadsIndex)