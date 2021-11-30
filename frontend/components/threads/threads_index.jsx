import React from "react";
import NewThread from "./new_thread";
import ThreadItem from "./thread_item";
import * as RealtimeUser from "../../utils/user_config_socket"

class ThreadsIndex extends React.Component{
  renderThreads(){
    const {setActiveThread, createSocket} = this.props
    const allThreads = this.props.threads
    const threads = allThreads.filter(thread => thread.isThread)
    return (
      <div className='threads'>
        {threads.map(item => (
          <ThreadItem
            key={item.id}
            thread={item}
            deleteThread={() => RealtimeUser.deleteThread({ thread: item.id, user: this.props.currentUserId })}
            setActiveThread={() => setActiveThread(item.id)}
            createSocket={() => createSocket(item.id)}
          />
        ))}
      </div>
    )
  }

  renderDMs() {
    const { setActiveThread, createSocket } = this.props
    const allThreads = this.props.threads
    const dms = allThreads.filter(thread => !thread.isThread)
    return (
      <div className='dms'>
        {dms.map(item => (
          <ThreadItem
            key={item.id}
            thread={item}
            deleteThread={() => RealtimeUser.deleteThread({ thread: item.id, user: this.props.currentUserId })}
            setActiveThread={() => setActiveThread(item.id)}
            createSocket={() => createSocket(item.id)}
          />
        ))}
      </div>
    )
  }
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
        {this.renderThreads()}
        {this.renderDMs()}
        {/* {
          threads.map(item => (
            <ThreadItem
              key={item.id}
              thread={item}
              deleteThread={() => RealtimeUser.deleteThread({thread: item.id, user: this.props.currentUserId})}
              setActiveThread={() => setActiveThread(item.id)}
              createSocket={() => createSocket(item.id)}
            />
          ))
        } */}
      </div>
    )
  }
}

export default ThreadsIndex;