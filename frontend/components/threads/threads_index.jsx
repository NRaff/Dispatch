import React from "react";
import NewThread from "./new_thread";
import ThreadItem from "./thread_item";

const ThreadsIndex = ({threads, createThread, deleteThread}) => {
  return (
    <div className='all-threads'>
      <NewThread createThread={createThread} />
      {
        threads.map(item => (
          <ThreadItem
            key={item.id}
            thread={item}
            deleteThread={() => deleteThread(item.id)}
          />
        ))
      }
    </div>
  )
}

export default ThreadsIndex;