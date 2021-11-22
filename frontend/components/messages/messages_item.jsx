import React from "react";

const MessageItem = ({message, updateMessage, deleteMessage}) => (
  <div className='message-item'>
    <p>{message.message}</p>
  </div>
)

export default MessageItem;

