import React from "react";
import NewThread from "./new_thread";
import ThreadItem from "./thread_item";
import * as RealtimeUser from "../../utils/user_config_socket"

class ThreadsIndex extends React.Component{
  componentDidMount(){
    const {currentUserId, dispatch} = this.props
    RealtimeUser.createRealtimeUser(dispatch, currentUserId)
    // RealtimeUser.receiveAllUsers(currentUserId)
  }

  render(){
    const { 
      threads,
      createThread, 
      deleteThread, 
      setActiveThread, 
      createSocket 
    } = this.props
    return (
      <div className='all-threads'>
        <NewThread createThread={createThread} />
        {
          threads.map(item => (
            <ThreadItem
              key={item.id}
              thread={item}
              deleteThread={() => deleteThread(item.id)}
              setActiveThread={() => setActiveThread(item.id)}
              createSocket={() => createSocket(item.id)}
            />
          ))
        }
      </div>
    )
  }
}

export default ThreadsIndex;