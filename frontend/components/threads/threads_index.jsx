import React from "react";
import NewThread from "./new_thread";
import ThreadItem from "./thread_item";

const ThreadsIndex = ({threads, createThread, deleteThread, setActiveThread, createSocket}) => {
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

export default ThreadsIndex;