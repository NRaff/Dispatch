import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../utils/theme";
import * as RealtimeThread from '../../utils/sockets'

const createdTime = timestamp => {
  let date = new Date(timestamp)
  return date.toLocaleString()
}

const deleteMessage = (payload) => {
  RealtimeThread.deleteMessage(payload)
}


const MessageItem = ({message, sender, currentUserId, updateMessage, /*deleteMessage*/}) => (
  <div className='full-message'>
    <img className={Icons.profile.lightProfile} alt="profileImg" />
    <div className='message-item'>
      <div className='message-header'>
        <h3>{sender}</h3>
        <p>{createdTime(message.createdAt)}</p>
      </div>
      <p>{message.message}</p>
    </div>
    <div className='edit-delete'>
      <Link className='edit-btn' to={`/edit/${message.id}`}>Edit</Link>
      <button 
        onClick={() => deleteMessage({id: message.id, sender_id: currentUserId})}
        className='delete-btn'
      >Delete</button>
    </div>
  </div>
)

export default MessageItem;

