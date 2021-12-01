import React from "react";
import NewThread from "./new_thread";
import ThreadItem from "./thread_item";
import * as RealtimeUser from "../../utils/user_config_socket"
import SearchContainer from "../top_nav/search_container"

class ThreadsIndex extends React.Component{
  renderThreads(){
    const {setActiveThread, createSocket, messages, currentUserId} = this.props
    const allThreads = this.props.threads
    const threads = allThreads.filter(thread => thread.isThread)
    return (
      <div className='threads'>
        {threads.map(item => (
          <ThreadItem
            key={item.id}
            thread={item}
            deleteThread={() => RealtimeUser.deleteThread({ thread: item.id, user: currentUserId })}
            setActiveThread={() => setActiveThread({thread: item.id, user: currentUserId})}
            createSocket={() => createSocket(item.id)}
            unreads={messages.filter(m => m.threadId === item.id).length}
            activeThread={this.props.activeThreadId}
          />
        ))}
      </div>
    )
  }


  renderDMs() {
    const { setActiveThread, createSocket, messages } = this.props
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
            unreads={messages.filter(m => m.threadId === item.id).length}
            activeThread={this.props.activeThreadId}
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
      </div>
    )
  }
}

export default ThreadsIndex;