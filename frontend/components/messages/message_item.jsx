import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../utils/theme";

const createdTime = timestamp => {
  let date = new Date(timestamp)
  return date.toLocaleString()
}

const MessageItem = ({message, sender, updateMessage, deleteMessage}) => (
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
      <Link to={`/${message.id}`}>Edit</Link>
      <button onClick={() => deleteMessage(message.id)}>Delete</button>
    </div>
  </div>
)

export default MessageItem;

