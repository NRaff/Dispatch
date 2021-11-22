import React from "react";

const ThreadItem = ({thread, deleteThread}) => (
  <div className='thread-item'>
    <h3>{thread.name}</h3>
    <button 
      onClick={deleteThread}
    >🗑</button>
  </div>
)

export default ThreadItem;