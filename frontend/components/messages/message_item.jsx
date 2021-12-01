import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../utils/theme";
import * as RealtimeThread from '../../utils/thread_chat_socket'

class MessageItem extends React.Component {
  constructor(props) {
    super(props)
    this.deleteMessage = this.deleteMessage.bind(this)
  }

  createdTime(timestamp) {
    let date = new Date(timestamp)
    return date.toLocaleString()
  }

  deleteMessage(payload) {
    RealtimeThread.deleteMessage(payload)
  }

  renderCurrentUserMessage() {

  }

  renderOtherUserMessage() {

  }

  render() {
    const { message, sender, currentUserId } = this.props
    return (
      <div className='full-message'>
        <img className={Icons.profile.lightProfile} alt="profileImg" />
        <div className='message-item'>
          <div className='message-header'>
            <h3>{sender}</h3>
            <p>{this.createdTime(message.createdAt)}</p>
          </div>
          <p>{message.message}</p>
        </div>
        <div className='edit-delete'>
          <Link className='edit-btn' to={`/edit/${message.id}`}>Edit</Link>
          <button
            onClick={() => this.deleteMessage({ id: message.id, sender_id: currentUserId, threadId: message.threadId })}
            className='delete-btn'
          >Delete</button>
        </div>
      </div>
    )
  }
}

export default MessageItem;

