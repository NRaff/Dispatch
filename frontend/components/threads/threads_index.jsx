import React from "react";
import NewThread from "./new_thread";
import ThreadItem from "./thread_item";
import * as RealtimeUser from "../../utils/user_config_socket"

class ThreadsIndex extends React.Component{
  render(){
    const { 
      threads,
      setActiveThread, 
      createSocket 
    } = this.props
    return (
      <div className='all-threads'>
        <NewThread 
          currentUser={this.props.currentUserId}
        />
        {
          threads.map(item => (
            <ThreadItem
              key={item.id}
              thread={item}
              deleteThread={() => RealtimeUser.deleteThread({thread: item.id, user: this.props.currentUserId})}
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